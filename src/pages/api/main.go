package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"github.com/joho/godotenv"
)

// Item represents the structure of an item from Rakuten API response
type Item struct {
	ItemName        string `json:"itemName"`
	ItemUrl         string `json:"itemUrl"`
	MediumImageUrls []struct {
		ImageUrl string `json:"imageUrl"`
	} `json:"mediumImageUrls"`
	ReviewCount   int     `json:"reviewCount"`
	ReviewAverage float64 `json:"reviewAverage"`
}

// UserDetail はフロントエンドから受け取るデータ
type UserDetail struct {
	Career   int `json:"career"`
	Position int `json:"position"`
	Goal     int `json:"goal"`
}

// RoadmapResponse はレスポンスとして返すデータ
type RoadmapResponse struct {
	Description string `json:"description"`
	Steps       int    `json:"steps"`
}

// RakutenResponse represents the structure of the Rakuten API response
type RakutenResponse struct {
	Items []struct {
		Item Item `json:"Item"`
	} `json:"Items"`
}

// CORS対応ミドルウェア
func enableCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		h.ServeHTTP(w, r)
	})
}

// fetchRakutenItems fetches items from Rakuten API
func fetchRakutenItems(category, subcategory string) ([]Item, error) {
	apiURL := "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601"
	applicationID := os.Getenv("RAKUTEN_APPLICATION_ID")
	affiliateID := os.Getenv("RAKUTEN_AFFILIATE_ID")

	searchKeyword := url.QueryEscape(category)
	if subcategory != "" {
		searchKeyword += "+" + url.QueryEscape(subcategory)
	}

	url := fmt.Sprintf("%s?applicationId=%s&affiliateId=%s&keyword=%s&hits=20",
		apiURL, applicationID, affiliateID, searchKeyword)
	fmt.Println("Request URL:", url)

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch items: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		fmt.Println("Rakuten API Error Response:", string(body))
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var rakutenResponse RakutenResponse
	if err := json.NewDecoder(resp.Body).Decode(&rakutenResponse); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	var items []Item
	for _, result := range rakutenResponse.Items {
		items = append(items, result.Item)
	}

	return items, nil
}

// Rakuten API handler
func rakutenHandler(w http.ResponseWriter, r *http.Request) {
	category := r.URL.Query().Get("category")
	subcategory := r.URL.Query().Get("subcategory")

	if category == "" {
		http.Error(w, "category is required", http.StatusBadRequest)
		return
	}

	items, err := fetchRakutenItems(category, subcategory)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to fetch items: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

// Roadmap handler
func roadmapHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var userDetails UserDetail
	if err := json.NewDecoder(r.Body).Decode(&userDetails); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// デバッグ用ログ
	log.Printf("Received data: %+v\n", userDetails)

	// ロードマップのステップを生成
	var description string

	if userDetails.Career == 1 && userDetails.Goal == 3 {
		description = fmt.Sprintf(
			"Career: %d, Position: %d, Goal: %d のロードマップです。\n" +
				"1: 第1段階: 基礎知識の習得\n" +
				"2: 第2段階: 実践的スキルの習得\n" +
				"3: 第3段階: 小規模プロジェクトの経験\n" +
				"4: 第4段階: チーム開発体験\n" +
				"5: 第5段階: 個人成果物の作成\n",
			userDetails.Career, userDetails.Position, userDetails.Goal)
	} else {
		description = fmt.Sprintf(
			"Career: %d, Position: %d, Goal: %d のロードマップです。\n" +
				"1: 一般的なステップ1\n" +
				"2: 一般的なステップ2\n",
			userDetails.Career, userDetails.Position, userDetails.Goal)
	}

	// レスポンス構造体を作成
	response := RoadmapResponse{
		Description: description,
		Steps:len(strings.Split(description, "\n")) - 1, // ステップ数を計算
	}

	// レスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}


func main() {
	// 環境変数の読み込み
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	// ルーティング
	mux := http.NewServeMux()
	mux.HandleFunc("/api/rakuten-items", rakutenHandler)
	mux.HandleFunc("/api/roadmap", roadmapHandler)

	// CORS対応ミドルウェアをサーバー全体に適用
	handler := enableCORS(mux)

	// サーバー起動
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server is running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
