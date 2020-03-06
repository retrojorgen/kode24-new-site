const Article = props => {
  let bufferedArticle = props.article;
  console.log("this", bufferedArticle);
  let id = 0;
  let wratio = 0.53861386138614;
  let cropw = 100;
  let croph = 80.712166172107;
  let posy = 0;
  let posx = 0;
  let imageId = 0;
  let kicker = "";
  let url = "";
  let title = "";
  let subTitle = "";
  let fontSize = 38;
  let mobileFontSize = 29;
  let textAlign = "";

  let imageWidth = 800;

  let companyImageUrl = "";
  let companyName = "";

  if (
    bufferedArticle &&
    bufferedArticle.children[0] &&
    bufferedArticle.children[0].data
  ) {
    id = bufferedArticle.children[0].data.bufferedArticleId || id;
    kicker = bufferedArticle.children[0].data.kicker || kicker;
    url =
      "https://www.kode24.no" +
        bufferedArticle.children[0].data.published_url || url;
    title = bufferedArticle.children[0].data.title || "";
    subTitle = bufferedArticle.children[0].data.subtitle || "";

    let viewPorts =
      bufferedArticle.children[0].data.viewports_json &&
      bufferedArticle.children[0].data.viewports_json.length > 0
        ? JSON.parse(bufferedArticle.children[0].data.viewports_json)
        : {};

    if (bufferedArticle.children[0].data.children.image) {
      if (bufferedArticle.children[0].data.children.image.field) {
        wratio =
          bufferedArticle.children[0].data.children.image.field.whRatio ||
          wratio;
        cropw =
          bufferedArticle.children[0].data.children.image.field.cropw || cropw;
        croph =
          bufferedArticle.children[0].data.children.image.field.croph || croph;
        posy = bufferedArticle.children[0].data.children.image.field.y || posy;
        posx = bufferedArticle.children[0].data.children.image.field.x || posx;

        if (imageWidth < 500) {
          let mobileViewport =
            JSON.parse(
              bufferedArticle.children[0].data.children.image.field
                .viewports_json
            ) || {};
          imageWidth = 600;
          cropw = mobileViewport.mobile.fields.cropw || 53;
          croph = mobileViewport.mobile.fields.croph || 100;
          posx = mobileViewport.mobile.fields.x || 0;
          posy = mobileViewport.mobile.fields.y || 0;
          wratio =
            mobileViewport &&
            mobileViewport.mobile &&
            mobileViewport.mobile.fields &&
            mobileViewport.mobile.fields.whRatio
              ? mobileViewport.mobile.fields.whRatio
              : 1.246875;
          mobileFontSize =
            viewPorts &&
            viewPorts.mobile &&
            viewPorts.mobile.fields.title_style_json &&
            viewPorts.mobile.fields.title_style_json.text_size
              ? viewPorts.mobile.fields.title_style_json.text_size
              : 29;
        }
      }
      if (bufferedArticle.children[0].data.children.image.attribute) {
        imageId =
          bufferedArticle.children[0].data.children.image.attribute
            .instanceof_id || 0;
      }
    }

    if (bufferedArticle.children[0].data.title_style_json) {
      let titleStyles = JSON.parse(
        bufferedArticle.children[0].data.title_style_json
      );

      fontSize = titleStyles.text_size || "";
      textAlign = titleStyles.text_align || "";
    }
  }

  return (
    <article className="preview columns">
      <a href={url}>
        <figure
          id={imageId}
          style={{ width: "100%", paddingBottom: wratio * 100 + "%" }}
        >
          <img
            className=""
            itemprop="image"
            alt="logo"
            src={`//dbstatic.no/${imageId}.jpg?imageId=${imageId}&x=${posx}&y=${posy}&cropw=${cropw}&croph=${croph}&width=${imageWidth}&height=${Math.round(
              imageWidth * wratio
            )}&compression=80`}
          />
        </figure>
        <div className="article-preview-text">
          <div className="labels"></div>
          <h1
            className={`headline large-size-${fontSize} text-${textAlign} small-size-${mobileFontSize}`}
          >
            <span dangerouslySetInnerHTML={{ __html: title }}></span>
          </h1>
          <p>{subTitle}</p>
        </div>
      </a>
    </article>
  );
};

export default Article;
