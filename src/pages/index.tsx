import Layout from "@/components/layout/Layout ";
import styles from "../styles/pages/index.module.css";

export default function Home() {
  return (
    <div>
      <Layout>
        <div>
          <img
            src="/images/実験.jpg"
            className={styles.productDetailTopLeftImage} // CSS Modulesのクラスを適用
          />

          <div className="p-[20px]">
            <h1 className="text-left font-bold text-[30px] ml-3px">
              エンジニアの「学び方」がわかる
            </h1>
            <p className="text-left text-[20px] mt-8px color: #6a6f73;">
              あなたの学び方に合わせた学習方法を見つけよう
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
}
