import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import photo from "../public/images/photo.jpg";
import instagram from "../public/svg/instagram.svg";
import linkedin from "../public/svg/linkedin.svg";
import github from "../public/svg/github.svg";
import react from "../public/svg/react.svg";
import ts from "../public/svg/ts.svg";
import js from "../public/svg/js.svg";
import node from "../public/svg/node.svg";
import html from "../public/svg/html.svg";
import mongo from "../public/svg/mongo.svg";
import css from "../public/svg/css.svg";
import express from "../public/svg/express.svg";
import firebase from "../public/svg/firebase.svg";
import next from "../public/svg/next.svg";
import sanity from "../public/svg/sanity.svg";
import adonis from "../public/svg/adonis.svg";
import vue from "../public/svg/vue.svg";
import boafresh from "../public/images/boafresh.png";
import damiBlog from "../public/images/damiBlog.png";
import linkedinImg from "../public/images/linkedin.png";
import disney from "../public/images/disney.png";
import locationShare from "../public/images/location_share.png";
import fyp from "../public/images/fyp.png";
import chevronLeft from "../public/svg/chevron-left.svg";
import chevronRight from "../public/svg/chevron-right.svg";
import redux from "../public/svg/redux.svg";
import { useState } from "react";
import {
  FiChevronRight,
  FiChevronLeft,
  FiGithub,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";

const Home: NextPage = () => {
  const projects = [
    {
      id: 1,
      name: "The Dami Blog: Blog App",
      image: damiBlog,
      link: "https://blog-app-mrsonam.vercel.app",
    },
    {
      id: 2,
      name: "BoaFresh: Restaurant E-Commerce",
      image: boafresh,
      link: "https://mrsonam.github.io/boafresh-api-react-ts-reduxtoolkit",
    },
    {
      id: 3,
      name: "Location Share: A location sharing app",
      image: locationShare,
      link: "https://github.com/mrsonam/location-share",
    },
    {
      id: 4,
      name: "FYP: Handwriting Recognition System using CNN",
      image: fyp,
      link: "https://github.com/mrsonam/HandwritingRecognitionSystem",
    },
    {
      id: 5,
      name: "Disney+ UI Clone",
      image: disney,
      link: "https://mrsonam.github.io/disneyplus-clone-antd/",
    },
    {
      id: 6,
      name: "Linkedin UI Clone",
      image: linkedinImg,
      link: "https://mrsonam.github.io/LinkedIn-Clone/",
    },
  ];

  const [currentProject, setCurrentProject] = useState(1);
  const [hide, setHide] = useState<number[]>([]);

  const nextProjectHandler = () => {
    setHide([...hide, currentProject]);
    if (currentProject < projects.length - 1) {
      setCurrentProject(currentProject + 1);
    }
  };

  const prevProjectHandler = () => {
    const arr = [...hide];
    arr.pop();
    setHide(arr);
    if (currentProject > 1) {
      setCurrentProject(currentProject - 1);
    }
  };

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  function handleTouchStart(e: any) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e: any) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 150) {
      // do your stuff here for left swipe
      nextProjectHandler();
    }

    if (touchStart - touchEnd < -150) {
      // do your stuff here for right swipe
      prevProjectHandler();
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Sonam Wangdi Sherpa | @mr.sonam</title>
        <meta
          name="description"
          content="Personal portfolio site of Sonam Wangdi Sherpa"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <section className={styles.left}>
          <div className={styles.name_container}>
            <div className={styles.img_container}>
              <Image
                src={photo}
                width="80px"
                height="80px"
                alt="Profile Picture"
                className={styles.img}
              />
            </div>
            <div className={styles.vertical_border}></div>
            <div className={styles.name}>
              <h3>Sonam Wangdi Sherpa</h3>
              <p>Frontend Developer</p>
            </div>
          </div>

          <div className={styles.links}>
            <a href="https://www.instagram.com/mr.sonam/" target="__blank">
              <FiInstagram className={styles.icon} />
            </a>
            <a href="https://www.linkedin.com/in/mrsonam/" target="__blank">
              <FiLinkedin className={styles.icon} />
            </a>
            <a href="https://www.github.com/mrsonam/" target="__blank">
              <FiGithub className={styles.icon} />
            </a>
          </div>

          <div className={styles.bio}>
            <p>
              A tech savvy who is flexible and adaptable to new ideas and roles.
            </p>
          </div>

          <div>
            <h3>Skills</h3>
            <div className={styles.skills}>
              <Image
                src={html}
                alt="html5"
                className={styles.skill}
                width="25px"
                height="25px"
              />
              <Image
                src={css}
                alt="css3"
                className={styles.skill}
                width="25px"
                height="25px"
              />
              <Image
                src={js}
                alt="javascript"
                className={styles.skill}
                width="25px"
                height="25px"
              />
              <Image
                src={ts}
                alt="typescript"
                className={styles.skill}
                width="25px"
                height="25px"
              />
              <Image
                src={react}
                alt="react"
                className={styles.skill}
                width="25px"
                height="25px"
              />
              <Image
                src={next}
                alt="next"
                className={styles.skill}
                width="25px"
                height="25px"
              />
              <Image
                src={redux}
                alt="redux"
                className={styles.skill}
                width="25px"
                height="25px"
              />
              <Image
                src={node}
                alt="node"
                className={styles.skill}
                width="25px"
                height="25px"
              />
              <Image
                src={mongo}
                alt="mongo"
                className={styles.skill}
                width="25px"
                height="25px"
              />
              <Image
                src={firebase}
                alt="firebase"
                className={styles.skill}
                width="25px"
                height="25px"
              />
            </div>
          </div>

          <div>
            <h3>Currently Learning</h3>
            <div className={styles.learning}>
              <Image
                src={express}
                alt="expressjs"
                className={styles.skill}
                width="25px"
                height="25px"
              />
              {/* <Image
                src={sanity}
                alt="sanity"
                className={styles.skill}
                width="25px"
                height="25px"
              />
              <Image
                src={vue}
                alt="vue"
                className={styles.skill}
                width="25px"
                height="25px"
              /> */}
            </div>
          </div>
        </section>

        <section className={styles.right}>
          <h3 className={styles.right_title}>Projects</h3>
          <div
            className={styles.projects}
            onTouchStart={(e) => handleTouchStart(e)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={handleTouchEnd}
          >
            {projects.map((project, index) => (
              <div
                className={`${styles.card} ${
                  hide.includes(project.id) ? styles.hide : ""
                } ${hide.length + 1 === project.id ? styles.active : ""}`}
                key={project.id}
              >
                <a href={project.link} target="__blank">
                  <Image
                    src={project.image}
                    alt={project.name}
                    className={styles.image}
                  />
                </a>
                <h5 className={styles.card_text}>{project.name}</h5>
              </div>
            ))}
          </div>
          <div className={styles.chevrons}>
            {}
            <FiChevronLeft
              size={30}
              className={styles.chevron_left}
              onClick={prevProjectHandler}
            />
            <FiChevronRight
              size={30}
              className={styles.chevron_right}
              onClick={nextProjectHandler}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
