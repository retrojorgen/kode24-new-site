import Head from "next/head";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Footer from "./components/footer.js";
import Article from "./components/article.js";

const Home = props => (
  <div className="container">
    <main class="frontpage wide" role="main" data-pageId="70185540">
      <div id="front-articles-list">
        {props.articles.map(articleRow => (
          <div className="row">
            {articleRow.children.map(article => {
              if (article.data.boxname === "markup") {
                return (
                  <div
                    dangerouslySetInnerHTML={{ __html: article.markup }}
                  ></div>
                );
              } else {
                return <Article article={article} />;
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
    articles: data.result[0].content["lab-dz-1"].slice(0, 4)
  };
};

export default Home;
