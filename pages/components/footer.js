const Footer = () => (
  <>
    <footer
      className="main-footer"
      itemType="https://schema.org/Organization"
      itemScope
      role="contentinfo"
    >
      <div className="row">
        <div className="small-12 medium-4 large-3 columns">
          <a
            className="main-logo"
            itemProp="url"
            href="//www.kode24.no"
            title="Kode24"
          >
            {" "}
            <img
              src="//kodestyle.kode24.no/assets/kode24/kode24-logo.svg"
              alt="Kode24 logo"
            />{" "}
            <span itemProp="name" className="hide">
              Kode24
            </span>{" "}
          </a>
          <dl>
            <dt>Postadresse:</dt>
            <dd
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="postOfficeBoxNumber">Boks 1184</span> Sentrum,{" "}
              <span itemProp="postalCode">0107</span>{" "}
              <span itemProp="addressLocality">Oslo</span>
            </dd>
            <dt>Besøksadresse:</dt>
            <dd
              itemProp="location"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <a href="https://goo.gl/maps/EmpIH">
                <span itemProp="streetAddress">Karvesvingen 1</span>,{" "}
                <span itemProp="postalCode">0579</span>{" "}
                <span itemProp="addressLocality">Oslo</span>
              </a>
            </dd>
          </dl>
        </div>
        <div className="small-12 medium-3 large-3 columns">
          <ul>
            <li>
              <a href="https://www.kode24.no/rss/forsida">RSS</a>
            </li>
            <li>
              <a href="https://www.kode24.no/kodenytt/endelig-har-utviklere-fatt-egen-nettavis/70206194">
                Om kode24
              </a>
            </li>
            <li>
              <a
                href="https://www.kode24.no/annonse/priser-pa-stillingsannonser-og-content/70244826"
                className="text-yellow"
              >
                Annonsepriser
              </a>
            </li>
            <li>
              <a
                href="https://kode24.us18.list-manage.com/subscribe?u=5d3f3db9c01ecb82ba9b34eb8&id=2e56df70a1"
                className="text-yellow"
              >
                Nyhetsbrev (ukentlig)
              </a>
            </li>
            <li></li>
            <li>
              <a href="https://personvern.aller.no/personvern">
                Personvern info
              </a>
            </li>
            <li>
              <a href="mailto:hei@kode24.no">Teknisk feil på nettsiden?</a>
            </li>
          </ul>
        </div>
        <div className="small-12 medium-3 large-3 columns">
          <div itemScope itemType="https://schema.org/Person">
            <div>
              <span itemProp="jobTitle">
                <strong>Fagredaktør</strong>
              </span>
              : <br />
              <a href="mailto:jorgen@kode24.no" itemProp="email">
                <span itemProp="name">Jørgen Jacobsen</span>
              </a>
            </div>
            <div>
              <span itemProp="jobTitle">
                <strong>Redaktør</strong>
              </span>
              : <br />
              <a href="mailto:ole@kode24.no" itemProp="email">
                <span itemProp="name">Ole Petter Baugerød Stokke</span>
              </a>
            </div>
            <div>
              <span itemProp="jobTitle">
                <strong>Ansvarlig redaktør</strong>
              </span>
              : <br />
              <a href="mailto:jan.thoresen@aller.com" itemProp="email">
                <span itemProp="name">Jan Thoresen</span>
              </a>
            </div>
          </div>
          <div itemType="https://schema.org/Organization" itemScope>
            <br />
            <br />
            Utgitt av{" "}
            <a href="//sol.no">
              <span itemProp="name">Scandinavia Online</span>
            </a>{" "}
            - et selskap i Aller Media
          </div>
          <br />
          <div>
            <span itemProp="name">Powered by Labrador CMS</span>
          </div>
        </div>
        <div className="small-12 medium-3 large-3 columns end">
          <p>
            Vi arbeider etter Vær varsom-plakatens regler for god presseskikk.
            Den som mener seg rammet av urettmessig publisering, oppfordres til
            å ta kontakt med redaksjonen. Du kan også klage inn saker til
            Pressens Faglige Utvalg for behandling og vurdering - se{" "}
            <a href="http://www.pfu.no">www.pfu.no</a>.
          </p>
          <p className="footer-logo__pfu">
            <img
              src="//kodestyle.kode24.no/assets/images/pfu-logo.png"
              alt="Norsk Presseforbund"
            />
          </p>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
