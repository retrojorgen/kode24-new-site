import Head from "next/head";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Footer from "./components/footer.js";
import Article from "./components/article.js";

const Home = props => (
  <div className="container">
    <Head>
      <link href="/main.css" rel="stylesheet" />
    </Head>
    <main className="frontpage wide" role="main" data-pageid="70185540">
      <div id="front-articles-list">
        {props.articles.map((articleRow, articleRowIndex) => (
          <div className="row" key={articleRowIndex}>
            {articleRow.children.map((article, articleIndex) => {
              if (article.data.boxname === "markup") {
                return (
                  <div
                    key={articleIndex}
                    dangerouslySetInnerHTML={{ __html: article.markup }}
                  ></div>
                );
              } else {
                return <Article article={article} key={articleIndex} />;
              }
            })}
          </div>
        ))}
      </div>
      <aside id="desktop-sidemenu-front"></aside>
    </main>
    <Footer />
  </div>
);
Home.getInitialProps = async function() {
  const res = await fetch("https://api.kode24.no/front/?query=id:70185540");
  const data = await res.json();

  return {
    articles: data.result[0].content["lab-dz-1"].slice(0, 6)
  };
};

export default Home;
