import Head from "next/head";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Footer from "./components/footer";
import Article from "./components/article";
import PremiumAd from "./components/premiumAd";
const frontAds = {
  3: { type: "premium" },
  5: { type: "premium" },
  7: { type: "carousel" },
  9: { type: "premium" },
  11: { type: "premium" },
  13: { type: "premium" },
  15: { type: "premium" },
  17: { type: "premium" },
  19: { type: "premium" },
  21: { type: "premium" },
  23: { type: "premium" },
  25: { type: "premium" }
};

const Home = props => (
  <div className="container">
    <Head>
      <link href="/main.css" rel="stylesheet" />
    </Head>
    <main className="frontpage wide" role="main" data-pageid="70185540">
      <div id="front-articles-list">
        {/** iterate over front rows  */}
        {props.articles.map((articleRow, articleRowIndex) => (
          <>
            {/** Draw premium banners (two boxes)  */}
            {frontAds[articleRowIndex - 2] && (
              <div className="row top-listing" key={articleRowIndex + "ad"}>
                <Article article={props.frontAds[0].children[0]} />
              </div>
            )}
            <div className="row" key={articleRowIndex}>
              {articleRow.children.map((article, articleIndex) => {
                if (article.data.boxname === "markup") {
                  return (
                    <div
                      key={articleIndex}
                      dangerouslySetInnerHTML={{ __html: article.markup }}
                    ></div>
                  );
                } else if (
                  article.data.visibility_status &&
                  article.data.visibility_status === "P"
                ) {
                  return <Article article={article} key={articleIndex} />;
                }
              })}
            </div>
          </>
        ))}
      </div>
      <aside id="desktop-sidemenu-front"></aside>
    </main>
    <Footer />
  </div>
);

function newShuffledArray(array) {
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // eslint-disable-line no-param-reassign
  }
  return newArray;
}

Home.getInitialProps = async function() {
  // get frontArticles
  const res = await fetch("https://api.kode24.no/front/?query=id:70185540");
  const data = await res.json();
  // get ads from the ads frontpage /premium
  const frontAdsResult = await fetch(
    "https://api.kode24.no/front/?query=id:70267311"
  );
  const frontAdsData = await frontAdsResult.json();
  // get config of topbanner
  const bannerConfigResult = await fetch(
    "https://api.kode24.no/front/?query=id:70559216"
  );
  const bannerConfigData = await bannerConfigResult.json();
  // get all ads
  const allAdsResult = await fetch(
    "https://api.kode24.no/article/?query=published:[2017-01-01T00:00:00Z+TO+NOW]+AND+NOT+hidefromfp_time:[*+TO+NOW]+AND+visibility_status:P+AND+section:jobb&site_id=207&limit=2000"
  );
  const allAdsData = await allAdsResult.json();

  // check if we have a valid bannerconfig
  let bannerConfigJSON = [];
  if (
    bannerConfigData.result[0] &&
    bannerConfigData.result[0].content["lab-dz-1"] &&
    bannerConfigData.result[0].content["lab-dz-1"][0] &&
    bannerConfigData.result[0].content["lab-dz-1"][0].children[0] &&
    bannerConfigData.result[0].content["lab-dz-1"][0].children[0].data &&
    bannerConfigData.result[0].content["lab-dz-1"][0].children[0].data.markup
  ) {
    try {
      bannerConfigJSON = JSON.parse(
        bannerConfigData.result[0].content["lab-dz-1"][0].children[0].data
          .markup
      );
    } catch (error) {}
  }

  frontAdsData.result[0].content["lab-dz-1"].shift();

  return {
    articles: data.result[0].content["lab-dz-1"].slice(0, 6),
    frontAds: frontAdsData.result[0].content["lab-dz-1"],
    bannerConfig: bannerConfigJSON,
    allAds: allAdsData.result
  };
};

export default Home;
