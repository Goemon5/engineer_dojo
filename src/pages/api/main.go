package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"

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


type RoadmapStep struct {
	Step        string `json:"step"`
	Goal        string `json:"goal"`
	Content     string `json:"content"`
	Methodology string `json:"methodology"`
}

type RoadmapResponse struct {
	Description []RoadmapStep `json:"description"`
	Steps       int           `json:"steps"`
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

	// Debug log
	log.Printf("Received data: %+v\n", userDetails)

	// Generate roadmap based on user details
	response := generateRoadmap(userDetails)

	// Respond with JSON
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

// Generate roadmap based on position and goal
func generateRoadmap(userDetails UserDetail) RoadmapResponse {
	steps := [][]RoadmapStep{
		// Frontend roadmap
		{
			{"第1段階", "フロントエンドの基礎を学ぶ", "基本的なHTML、CSS、JavaScriptの習得", "オンラインコースと個人プロジェクト"},
			{"第2段階", "インタラクティブな機能を実装できるようになる", "JavaScriptのDOM操作、イベント処理、基本的なAPIリクエスト", "書籍やハンズオンで実践"},
			{"第3段階", "Reactを習得する", "Reactの基本コンセプトやページ遷移", "書籍と動画コース"},
			{"第4段階", "TypeScriptとCSSフレームワークを導入", "実務レベルのコード品質とデザインスキルを向上させる", "プロジェクトを通して学習"},
			{"第5段階", "チーム開発ツールを習得する", "Gitやコードレビューのフロー", "実務的なプロジェクト参加"},
			{"第6段階", "実力を示すポートフォリオを完成させる", "自作アプリやポートフォリオサイトを公開", "企業にアピールするポートフォリオ制作"},
			{"第7段階", "メガベンチャーの内定を目指す", "面接対策と企業研究", "模擬面接とコーディングテスト"},
		},
		// Backend roadmap
		{
			{"第1段階", "バックエンドの基礎を学ぶ", "Python、Java、JavaScriptなどの基本文法,データ構造とアルゴリズム（リスト、辞書、配列、ソート、探索）の習得", "オンラインコース"},
			{"第2段階", "Webサーバーとデータベースの基礎を学ぶ", "HTTP/HTTPS、REST API、リクエストとレスポンスの仕組み,データベース（SQLの基本操作、RDBMSの概念、NoSQLの基礎）", "Webサーバー構築のチュートリアル（例: FlaskやExpressで簡単なアプリを作成）"},
			{"第3段階", "バックエンドフレームワークを習得する", "モダンなバックエンドフレームワークを使いこなす", "実践プロジェクト（例: 認証機能付きのToDoリストアプリの作成）"},
			{"第4段階", "開発環境とツールを習得する", "Git/GitHubの基本操作（ブランチ管理、マージ、プルリクエスト）,Dockerによるコンテナ管理", "個人プロジェクトでGitHubフローを実践,Dockerで簡単なローカル開発環境を構築"},
			{"第5段階", "クラウドサービスとインフラを学ぶ", "AWS（EC2、S3、RDS）、GCP、AzureなどのクラウドサービスLinuxコマンドやシェルスクリプト", "AWS無料枠を利用してインスタンスを立ててみる,個人プロジェクトでクラウドホスティング（HerokuやAWS Elastic Beanstalk）"},
			{"第6段階", "実力を示すポートフォリオを完成させる", "自作アプリやポートフォリオサイトを公開", "企業にアピールするポートフォリオ制作"},
			{"第7段階", "メガベンチャーの内定を目指す", "面接対策と企業研究", "模擬面接とコーディングテスト"},
		},
	}

	var roadmap RoadmapResponse

	if userDetails.Position == 1 {
		roadmap = createRoadmap(steps[0], userDetails.Goal)
	} else if userDetails.Position == 2 {
		roadmap = createRoadmap(steps[1], userDetails.Goal)
	} else {
		roadmap = RoadmapResponse{
			Description: []RoadmapStep{
				{"一般的なステップ1", "基本的なスキルを習得する", "基礎プログラミング技術の習得", "入門書や無料オンラインコースの活用"},
				{"一般的なステップ2", "中級スキルを身に付ける", "中級レベルのアルゴリズムとデータ構造", "教材や実際のプロジェクト参加"},
			},
			Steps: 2,
		}
	}

	return roadmap
}
func createRoadmap(steps []RoadmapStep, goal int) RoadmapResponse {
	totalSteps := len(steps)
	end := goal + 3
	if end > totalSteps {
		end = totalSteps
	}
	return RoadmapResponse{
		Description: steps[:end],
		Steps:       end,
	}
}



	// レスポンスを返す



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
