import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import styled from "styled-components";
import { useState } from "react";
import Sun from "../components/svg/sun";
import Moon from "../components/svg/moon";

export default function Home({ allPostsData }) {
  const [dark, setDark] = useState(true);
  return (
    <Layout home dark={dark}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Logs</h2>
        <Toggle onClick={() => setDark(!dark)} dark={dark}>
          <ToggleHandle dark={dark} />
          <span>
            <Moon />
            <Sun />
          </span>
        </Toggle>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Toggle = styled.div`
  padding: 2px 2px;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  background-color: ${(props) => (props.dark ? "gray" : "gray")};
  span {
    display: flex;
    width: 36px;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .moon * {
      fill: ${(props) => (props.dark ? "black" : "transparent")};
    }
    .sun * {
      fill: ${(props) => (props.dark ? "transparent" : "white")};
    }
  }
`;

const ToggleHandle = styled.div`
  z-index: 100;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => (props.dark ? "black" : "white")};
  transform: ${(props) => (props.dark ? "translateX(calc(100% + 4px))" : "")};
  transition: 0.5s 0s ease;
`;
