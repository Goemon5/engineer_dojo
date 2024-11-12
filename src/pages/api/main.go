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

// RakutenResponse represents the structure of the Rakuten API response
type RakutenResponse struct {
	Items []struct {
		Item Item `json:"Item"`
	} `json:"Items"`
}

func fetchRakutenItems(category, subcategory string) ([]Item, error) {
	apiURL := "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601"
	applicationID := os.Getenv("RAKUTEN_APPLICATION_ID")
	affiliateID := os.Getenv("RAKUTEN_AFFILIATE_ID")

	// URLエンコード
	searchKeyword := url.QueryEscape(category)
	if subcategory != "" {
		searchKeyword += "+" + url.QueryEscape(subcategory)
	}

	// リクエストURL作成
	url := fmt.Sprintf("%s?applicationId=%s&affiliateId=%s&keyword=%s&hits=20",
		apiURL, applicationID, affiliateID, searchKeyword)
	fmt.Println("Request URL:", url)

	// リクエスト送信
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

func handler(w http.ResponseWriter, r *http.Request) {
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

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	http.HandleFunc("/api/rakuten-items", handler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
