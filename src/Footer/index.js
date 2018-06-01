import React from 'react'

import styled from 'styled-components'
import { container } from '../styles'

const SocialLink = ({ src, href, children }) => (
  <Link src={src} href={href}>
    {children}
  </Link>
)

export default () => (
  <Footer>
    <Container>
      <Top>
        <Logo href="/">
          <img src="/static/img/logo_white.svg" alt="iterative.ai" />
        </Logo>
      </Top>
      <Columns>
        <Column>
          <Heading>Product</Heading>
          <Links>
            <Link href="/#">Overview</Link>
            <Link href="/features">Features</Link>
          </Links>
        </Column>
        <Column>
          <Heading>Help</Heading>
          <Links>
            <Link href="/#">Get started</Link>
            <Link href="/documentation">Documentation</Link>
          </Links>
        </Column>
        <Column>
          <Heading>Company</Heading>
          <Links>
            <Link href="/about">About Us</Link>
            <Link href="/contacts">Contact Us</Link>
          </Links>
        </Column>
        <Column>
          <Heading>Social</Heading>
          <Links>
            <SocialLink
              src="/static/img/twitter.png"
              href="https://twitter.com/Iterativeai "
            >
              Twitter
            </SocialLink>
            <SocialLink
              src="/static/img/github.png"
              href="https://github.com/iterative"
            >
              Github
            </SocialLink>
          </Links>
        </Column>
      </Columns>
      <Address>450 Townsend St. Suite 100, San Francisco, CA 94107</Address>
      <Copyright>
        ©2018 <small>DataVersionControl INC</small>
      </Copyright>
    </Container>
  </Footer>
)

const Footer = styled.section`
  min-height: 555px;
  background-color: #40364d;
  color: #fff;
`

const Container = styled.div`
  ${container};
  padding-top: 88px;
  padding-bottom: 176px;
`

const Top = styled.div`
  height: 40px;
  margin-bottom: 40.7px;
`

const Logo = styled.a``

const Columns = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 150px;
  margin-right: 66px;
`

const Heading = styled.h2`
  opacity: 0.61;
  color: #ffffff;
  font-size: 20px;
  font-weight: 100;
`

const Links = styled.div`
  margin-top: 29px;
  display: flex;
  flex-direction: column;
`

const Link = styled.a`
  line-height: 23px;
  font-size: 18px;
  margin-bottom: 17px;
  display: flex;
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #fff;
  }

  ${props =>
    props.src &&
    `
    &::before {
      margin-right: 14px;
      width: 26px;
      height: 26px;
      content: '';
      background-image: url(${props.src});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
  `};
`

const SocialIcon = styled.img`
  width: 26px;
  height: 26px;
  margin-right: 14px;
`

const Address = styled.div`
  padding-bottom: 18px;
  padding-top: 36px;
`

const Copyright = styled.div`
  padding-bottom: 18px;
  padding-top: 18px;
  font-size: 14px;

  small {
  }
`
