import Head from "next/head";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Footer from "./components/footer";
import Article from "./components/article";
import PremiumAd from "./components/premiumAd";

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
            {frontAds[articleRowIndex - 2] && props.frontBannerAds[0] && (
              <div className="row top-listing" key={articleRowIndex + "ad"}>
                <Article article={props.frontBannerAds[0]} />
              </div>
            )}
            {props.frontBannerAds.shift()}
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
  // the list of banners index by which row they should be injected in
  let frontBannerAdsByRow = [
    {},
    {},
    {},
    { type: "premium" },
    {},
    { type: "premium" },
    {},
    { type: "carousel" },
    {},
    { type: "premium" },
    {},
    { type: "premium" },
    {},
    { type: "premium" },
    {},
    { type: "premium" },
    {},
    { type: "premium" },
    {},
    { type: "premium" },
    {},
    { type: "premium" },
    {},
    { type: "premium" },
    {},
    { type: "premium" }
  ];

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
  // all the ads
  let allAds = allAdsData.result;

  // assuming all ads are full width and first element of array
  // first remove rows that are not banner ads (like markup rows)
  // then remap to only include the ads, not entire row
  let frontBannerAdsList = frontAdsData.result[0].content["lab-dz-1"]
    .filter(bannerRowChildren => {
      if (bannerRowChildren.children[0].data.isContentMarketing) return true;
    })
    .map(adsRow => {
      return adsRow.children[0];
    });

  // get bylines from ads api request
  frontBannerAdsList.map(bannerAd => {
    let foundArticle = allAds.find(
      articleAd => articleAd.id === bannerAd.data.articleId
    );
    if (
      foundArticle &&
      foundArticle.full_bylines &&
      foundArticle.full_bylines[0]
    )
      bannerAd.byline = foundArticle.full_bylines[0];
    return bannerAd;
  });

  // iterate
  frontBannerAdsByRow.map((ad, index) => {
    if (ad && ad.type && ad.type === "premium" && frontBannerAdsList[0]) {
      ad.banner = frontBannerAdsList[0];
      frontBannerAdsList.shift();
    }
  });

  console.log(frontBannerAdsByRow);

  return {
    articles: data.result[0].content["lab-dz-1"].slice(0, 6),
    frontBannerAdsByRow: frontBannerAdsByRow,
    bannerConfig: bannerConfigJSON,
    allAds: allAdsData.result
  };
};

export default Home;
