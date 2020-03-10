const getWidthClasses = (widthFromLabrador, width) => {
  let desktopSize = "large-12";
  let mobileSize = "small-12";

  if (widthFromLabrador) {
    if (widthFromLabrador.desktop)
      desktopSize = "large-" + widthFromLabrador.desktop;
    if (widthFromLabrador.mobile)
      mobileSize = "small-" + widthFromLabrador.mobile;
  }
  if (width === 50) {
    desktopSize = "large-" + 6;
  }
  return desktopSize + " " + mobileSize;
};

const Article = props => {
  let bufferedArticle = props.article;
  let id = 0;
  let wratio = 0.53861386138614;
  let cropw = 100;
  let croph = 80.712166172107;
  let posy = 0;
  let posx = 0;
  let imageId = 0;
  let label = "";
  let labelBackground = "";
  let titleBackground = "";
  let url = "";
  let title = "";
  let subTitle = "";
  let fontSize = 38;
  let mobileFontSize = 29;
  let textAlign = "";
  let articleWidth = getWidthClasses(
    bufferedArticle.metadata.width,
    bufferedArticle.width
  );
  let imageWidth = 800;
  let isContentMarketing =
    bufferedArticle.data.isContentMarketing === "1" ? true : false;
  let fullByline = bufferedArticle.data.full_bylines
    ? JSON.parse(bufferedArticle.data.full_bylines)
    : {};

  let companyImageUrl =
    fullByline && fullByline[0] && fullByline[0].imageUrl
      ? fullByline[0].imageUrl
      : "";
  let companyName =
    fullByline && fullByline[0] && fullByline[0].firstname
      ? fullByline[0].firstname
      : "";

  id = bufferedArticle.data.articleId || id;
  url = "https://www.kode24.no" + bufferedArticle.data.published_url || url;
  title = bufferedArticle.data.title || "";

  console.log(title, fullByline, companyImageUrl, companyName, bufferedArticle);

  subTitle = bufferedArticle.data.subtitle || "";
  label = bufferedArticle.data.label || "";
  labelBackground = bufferedArticle.data.labelBackground || "";
  let viewPorts =
    bufferedArticle.data.viewports_json &&
    bufferedArticle.data.viewports_json.length > 0
      ? JSON.parse(bufferedArticle.data.viewports_json)
      : {};

  // get box background color, used for background of title

  if (
    bufferedArticle.metadata &&
    bufferedArticle.metadata.box_background &&
    bufferedArticle.metadata.box_background.desktop
  ) {
    titleBackground = bufferedArticle.metadata.box_background.desktop;
  }

  if (bufferedArticle.data.children && bufferedArticle.data.children.image) {
    if (bufferedArticle.data.children.image.field) {
      wratio = bufferedArticle.data.children.image.field.whRatio || wratio;
      cropw = bufferedArticle.data.children.image.field.cropw || cropw;
      croph = bufferedArticle.data.children.image.field.croph || croph;
      posy = bufferedArticle.data.children.image.field.y || posy;
      posx = bufferedArticle.data.children.image.field.x || posx;

      if (imageWidth < 500) {
        let mobileViewport =
          JSON.parse(
            bufferedArticle.data.children.image.field.viewports_json
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
    if (bufferedArticle.data.children.image.attribute) {
      imageId =
        bufferedArticle.data.children.image.attribute.instanceof_id || 0;
    }
  }

  if (bufferedArticle.data.title_style_json) {
    let titleStyles = JSON.parse(bufferedArticle.data.title_style_json);

    fontSize = titleStyles.text_size || "";
    textAlign = titleStyles.text_align || "";
  }

  return (
    <article
      id={`article_${id}`}
      className={`preview columns compact ${articleWidth} ${titleBackground} ${
        isContentMarketing ? "native-advertisement" : ""
      }`}
      data-id={id}
      itemScope=""
      itemProp="itemListElement"
      itemType="https://schema.org/ListItem"
      role="article"
    >
      <a itemProp="url" href={url}>
        {isContentMarketing && <div className="kicker">LEDIG STILLING</div>}
        <figure
          id={imageId}
          style={{ width: "100%", paddingBottom: wratio * 100 + "%" }}
        >
          <img
            className=""
            itemProp="image"
            alt="logo"
            src={`//dbstatic.no/${imageId}.jpg?imageId=${imageId}&x=${posx}&y=${posy}&cropw=${cropw}&croph=${croph}&width=${imageWidth}&height=${Math.round(
              imageWidth * wratio
            )}&compression=80`}
          />
        </figure>
        {isContentMarketing && (
          <div className="company-information">
            <figure className="image-contain">
              <img alt="logo" src={`//dbstatic.no${companyImageUrl}`} />
            </figure>
            <span>{companyName}</span>
          </div>
        )}
        <div className="article-preview-text">
          <div className="labels">
            <span className={`label label-custom ${labelBackground}`}>
              {label}
            </span>
          </div>
          <h1
            className={`headline large-size-${fontSize} text-${textAlign} small-size-${mobileFontSize}`}
          >
            <span
              className="headline-title-wrapper"
              dangerouslySetInnerHTML={{ __html: title }}
            ></span>
          </h1>
          <p className="standfirst">{subTitle}</p>
        </div>
      </a>
    </article>
  );
};

export default Article;
