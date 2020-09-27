import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData, getAllPostIds } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import styled from "styled-components";
import Sun from "../components/svg/sun";
import Moon from "../components/svg/moon";
// import darkModeContext from "../context/darkMode";
import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkModeAction } from "../reducers/darkMode";

export default function Home({ slicedPostsData }) {
  // const darkModeChange = useContext(darkModeContext);
  // const dark = darkModeChange[0];
  const dispatch = useDispatch(); // dispatch를 사용하기 쉽게 하는 hook
  const dark = useSelector((state) => state.darkMode); // store의 state를 불러오는 hook   store의 state 중에서 count의 state를 불러온다.

  const onClickChange = useCallback(() => {
    // useCallback은 최적화를 위한 hook이다 이 앱에선 굳이 사용 안 해도 되는데 습관이 들면 좋기에 사용.
    dispatch(darkModeAction());
  }, []);

  return (
    <Layout home dark={dark}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Logs</h2>
        {/* <Toggle onClick={() => darkModeChange[1](!dark)} dark={dark}> */}
        <Toggle onClick={() => onClickChange()} dark={dark}>
          <ToggleHandle dark={dark} />
          <span>
            <Moon />
            <Sun />
          </span>
        </Toggle>
        <ul className={utilStyles.list}>
          {slicedPostsData.map(({ id, date, title }) => (
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
        <div>1페이지</div>
        <Link href="/2">
          <a>2페이지</a>
        </Link>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const slicedPostsData = allPostsData.slice(0, 3);
  return {
    props: {
      slicedPostsData,
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
