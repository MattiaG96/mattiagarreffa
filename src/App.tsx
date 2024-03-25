import { FC, useState } from 'react';
import me from './assets/img/me.png';
import programming from './assets/img/programming.png';
import mobile from './assets/img/mobile.png';
import server from './assets/img/server.png';
import nologis from './assets/img/nologis.svg';
import olyns from './assets/img/olyns.svg';
import mdb from './assets/img/mdb.png';
import { t } from 'i18next';
import { getDeviceLanguage, setUpTexts } from './translation/transtalteUtility';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { Loader } from './components/Loader/Loader';
import { LoaderControls } from './components/Loader/LoaderControls';
import { Banner } from './components/Banner/Banner';
import { BannerControls } from './components/Banner/BannerControls';

export const App: FC = () => {
  const cv = {
    en: 'https://drive.google.com/file/d/17DCZe-g9wpysV4gKEirgAf1kLbojDnaF/view?usp=sharing',
    es: 'https://drive.google.com/file/d/1Dn8aY6TDZYhKGaqPHlskRXh4K3wcT8Cm/view?usp=sharing',
  };
  setUpTexts();
  const { isLoaderVisible, showLoader, hideLoader } = LoaderControls();
  const { isBannerVisible, bannerMessage, showBanner, hideBanner } =
    BannerControls();
  const [email, setEmail] = useState('');
  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const navbarNavigation = (event: any) => {
    const oldButton = document.getElementsByClassName('navbar-selected');
    oldButton[0].classList.remove('navbar-selected');
    const newButton = event.target;
    const anchor = `${newButton.id}_anchor`;
    const target = document.getElementById(anchor);
    newButton.classList.add('navbar-selected');
    scrollTo(target);
  };
  const scrollTo = (target: HTMLElement | null) =>
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const downloadCV = () => window.open(cv[getDeviceLanguage()], '_blank');
  const sendMessage = () => {
    if (!email.length) {
      showBanner(t('write_email'));
      return;
    }
    showLoader();
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: 'api',
      key: process.env.REACT_APP_MAILGUN_API_KEY!,
      url: 'https://api.eu.mailgun.net/',
    });
    mg.messages
      .create('mdbtechsolutions.com', {
        from: 'Mattia Garreffa <info@mdbtechsolutions.com>',
        to: ['mattia.garreffa96@gmail.com'],
        subject: 'Nueva posibilidad',
        html: `<h1>Nueva posibilidad: ${email} a día ${new Date().toLocaleString()}</h1>`,
      })
      .then(() => {
        hideLoader();
        setEmail('');
        showBanner(t('email_succeess'));
      })
      .catch((err) => {
        console.error(err);
        hideLoader();
        showBanner(err);
      });
  };

  return (
    <>
      {isLoaderVisible && <Loader />}
      {isBannerVisible && (
        <Banner message={bannerMessage} onClose={hideBanner} />
      )}
      <div className="root">
        {/* NAVBAR */}
        <div className="navbar">
          <div>
            <a
              id="about_me"
              className="navbar-selected"
              onClick={navbarNavigation}
            >
              {t('about_me')}
            </a>
            <a id="services" className="" onClick={navbarNavigation}>
              {t('services')}
            </a>
            <a id="companies" className="" onClick={navbarNavigation}>
              {t('companies')}
            </a>
            <a id="contact" className="" onClick={navbarNavigation}>
              {t('contact')}
            </a>
            <a onClick={downloadCV}>{t('download_cv')}</a>
          </div>
        </div>
        {/* ABOUT ME */}
        <div className="about-me-root" id="about_me_anchor">
          <div>
            <h1 style={{ marginBottom: 0 }}>
              {`${t('hi_im')} `}
              <span style={{ fontSize: 40, color: 'orange' }}>Mattia</span>
            </h1>
            <h2 style={{ marginTop: 0 }}>
              Full Stack{' '}
              <span style={{ fontSize: 34, color: 'orange' }}>
                Software Developer
              </span>
            </h2>
            <div className="about-me-bottom-separator"></div>
            <p>{t('presentation')}</p>
          </div>
          <div>
            <img src={me} loading="lazy" />
          </div>
        </div>
        {/* SERVICES */}
        <div
          id="services_anchor"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>
            {t('my')} <span style={{ color: 'orange' }}>{t('services')}</span>
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '80%' }}>
            {t('my_services')}
          </p>
          <div className="service-card-container">
            <div className="service-card">
              <p>{t('web_development')}</p>
              <img src={programming} loading="lazy" />
            </div>

            <div className="service-card">
              <p>{t('mobile_development')}</p>
              <img src={mobile} loading="lazy" />
            </div>

            <div className="service-card">
              <p>{t('backend_development')}</p>
              <img src={server} loading="lazy" />
            </div>
          </div>
        </div>
        {/* COMPANIES */}
        <div
          id="companies_anchor"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>
            {t('companies_i')}{' '}
            <span style={{ color: 'orange' }}>{t('worked_with')}</span>
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '80%' }}>
            {t('companies_presentation')}
          </p>
          <div className="companies-root-container">
            <a
              href="https://www.nologis.com"
              target="_blank"
              rel="nonreferer"
              className="service-card"
            >
              <img src={nologis} loading="lazy" />
              <p style={{ textAlign: 'justify' }}>{t('nologis')}</p>
            </a>
            <a
              href="https://www.olyns.com"
              target="_blank"
              rel="nonreferer"
              className="service-card"
            >
              <img src={olyns} loading="lazy" />
              <p style={{ textAlign: 'justify' }}>{t('olyns')}</p>
            </a>
            <a
              href="https://www.mdbtechsolutions.com"
              target="_blank"
              rel="nonreferer"
              className="service-card"
            >
              <img src={mdb} loading="lazy" />

              <p style={{ textAlign: 'justify' }}>{t('mdb_tech')}</p>
            </a>
          </div>
        </div>
        {/* CONTACT ME */}
        <div
          id="contact_anchor"
          style={{
            marginBlock: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>
            {t('contact')} <span style={{ color: 'orange' }}>{t('me')}</span>
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '80%' }}>
            {t('contact_me_presentation')}
          </p>
          <div className="contact-input-container">
            <div
              style={{
                backgroundColor: 'orange',
                width: 40,
                height: 40,
                borderRadius: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <i
                className="fa-regular fa-envelope"
                style={{ fontSize: 20 }}
              ></i>
            </div>
            <input
              type="email"
              required
              onChange={handleEmailChange}
              value={email}
            />
            <button type="button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
        {/* FOOTER */}
        <div className="footer">
          <a
            href="https://www.linkedin.com/in/mattia-garreffa"
            target="_blank"
            rel="nonreferer"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>

          <a
            href="https://github.com/MattiaG96"
            target="_blank"
            rel="nonreferer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </>
  );
};
