const getWidthClasses = widthFromLabrador => {
  let size = "large-12 small-12"; // full width
  if (widthFromLabrador === 50) {
    size = "large-6 small-12";
  }
  return size;
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
  let url = "";
  let title = "";
  let subTitle = "";
  let fontSize = 38;
  let mobileFontSize = 29;
  let textAlign = "";
  let articleWidth = getWidthClasses(bufferedArticle.width);

  let imageWidth = 800;

  let companyImageUrl = "";
  let companyName = "";

  id = bufferedArticle.data.articleId || id;
  url = "https://www.kode24.no" + bufferedArticle.data.published_url || url;
  title = bufferedArticle.data.title || "";
  subTitle = bufferedArticle.data.subtitle || "";
  label = bufferedArticle.data.label || "";
  labelBackground = bufferedArticle.data.labelBackground || "";
  let viewPorts =
    bufferedArticle.data.viewports_json &&
    bufferedArticle.data.viewports_json.length > 0
      ? JSON.parse(bufferedArticle.data.viewports_json)
      : {};

  if (bufferedArticle.data.children.image) {
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
      className={`preview columns compact ${articleWidth}`}
      data-id={id}
      itemScope=""
      itemProp="itemListElement"
      itemType="https://schema.org/ListItem"
      role="article"
    >
      <a itemProp="url" href={url}>
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
