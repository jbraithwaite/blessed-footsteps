import type { NextPage } from 'next';
import React from 'react';
import { Link } from 'components/elements';
import { Container } from 'components/layout';
import { Header } from 'components/typography/Header';

const Home: NextPage = () => {
  return (
    <Container>
      <Header rank="1">Untitled Book</Header>
      <Link name="toc">
        <a>Table of Contents</a>
      </Link>
    </Container>
  );
};

export default Home;
