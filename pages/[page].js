import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData, getAllPostIds } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import styled from "styled-components";
import Sun from "../components/svg/sun";
import Moon from "../components/svg/moon";
import darkModeContext from "../context/darkMode";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function Home({ currentPage, pageLength, slicedPostsData }) {
  const router = useRouter();
  console.log(
    slicedPostsData.length + "렝스",
    currentPage + "페이지",
    pageLength + "길이"
  );
  // const darkModeChange = useContext(darkModeContext);
  // const dark = darkModeChange[0];
  const dark = true;
  return (
    <Layout home dark={dark}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Logs</h2>
        <Toggle onClick={() => darkModeChange[1](!dark)} dark={dark}>
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
        <Pagination>
          {Array(pageLength)
            .fill()
            .map((_, idx) => {
              return (
                <PaginationList
                  onClick={() => router.push(`/${idx + 1}`)}
                  currentPage={currentPage === idx}
                >
                  {idx + 1}
                </PaginationList>
              );
            })}
        </Pagination>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const postCount = getAllPostIds();
  let pageCount = 1;
  if (postCount.length % 3 !== 0) {
    pageCount = parseInt(postCount.length / 3) + 1;
  } else {
    pageCount = postCount.length / 3;
  }
  const pages = () => {
    return Array(pageCount)
      .fill(0)
      .map((x, i) => {
        return {
          params: {
            page: (i + 1).toString(),
          },
        };
      });
  };
  const paths = pages();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = params.page - 1 || 0;
  const allPostsData = getSortedPostsData();
  const slicedPostsData = allPostsData.slice(page * 3, page * 3 + 3);
  return {
    props: {
      currentPage: page,
      pageLength:
        allPostsData.length % 3 !== 0
          ? parseInt(allPostsData.length / 3) + 1
          : allPostsData.length / 3,
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

const Pagination = styled.ul`
  list-style: none;
  display: flex;
`;

const PaginationList = styled.li`
  color: ${({ currentPage }) => currentPage && "red"};
  margin: 10px;
`;
