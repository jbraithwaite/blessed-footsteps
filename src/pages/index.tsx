import type { NextPage } from 'next';
import React from 'react';
import { NewsletterSignup } from 'components/modules/NewsletterSignup';
import { Header } from 'components/typography/Header';

const Home: NextPage = () => {
  return (
    <main className="max-w-full py-20 px-5 sm:px-24 sm:max-w-5xl sm:mx-auto">
      <Header rank="1" styleLevel="display-1">
        Blessed Footsteps
      </Header>
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mb-5">
        <h2>`Abdu&apos;l-Bahá&apos;s Visit to California</h2>
        <p className="lead">
          How could the Message of peace and unity of a mid-19th century Persian
          who had been imprisoned, tortured and exiled, reach the shores of the
          Pacific Ocean in the early 20th century with such an impact as to
          attract multitudes at major universities, churches, temples, and
          organizations throughout California, generating hundreds of newspaper
          articles containing thousands of words about a religion, ancient and
          eternal, previously largely unknown to the American public?
        </p>
        <p>
          This question is explored by focusing on just 24 days of the 77 years
          in the life `Abdu&apos;l-Bahá—the son appointed by
          Bahá&apos;u&apos;lláh to maintain the purity of His Teachings after
          His passing. `Abdu&apos;l-Bahá&apos;s set out in 1911, at the age of
          67, to familiarize those living in European and American cities of the
          renewal of the ancient Faith of God. His overall purpose was simply to
          promote true human happiness according to the heavenly principles and
          guidance authored by His father, Bahá’u’lláh.
        </p>
        <i>Join us in tracing these blessed footsteps.</i>
      </div>
      <div className="p-5 bg-white filter drop-shadow-2xl rounded-2xl mt-10 ">
        <strong className="block text-2xl text-gray-800 mb-5">
          Receive updates
        </strong>
        <NewsletterSignup />
      </div>
      <footer className="text-gray-300 text-center text-xs my-10">
        © {new Date().getFullYear()} Blessed Footsteps |{' '}
        <a href="mailto:tracingsacredfootsteps@gmail.com?subject=blessedfootsteps.org">
          Contact
        </a>
      </footer>
    </main>
  );
};

export default Home;
