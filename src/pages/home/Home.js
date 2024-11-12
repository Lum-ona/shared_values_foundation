import React, { useEffect } from "react";
import About from "./sections/about/About";
import Approach from "./sections/approach/Approach";
import Community from "./sections/community/Community";
import Hero from "./sections/hero/Hero";
import Objectives from "./sections/objectives/Objectives";
import Partners from "./sections/partners/Partners";
import Programmes from "./sections/programme/Programmes";
import Scapii from "./sections/scapii/Scapii";
import Team from "./sections/team/Team";
import WhereWeWork from "./sections/whereWeWork/WhereWeWork";
import Preloader from "../../utilities/preloader/Preloader";

const sectionComponents = {
  0: About,
  1: Objectives,
  2: Scapii,
  3: WhereWeWork,
  4: Community,
  5: Approach,
  6: Programmes,
  7: Team,
  8: Partners,
};

export default function Home({ data, dataIndex }) {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [data]);

  if (!data || !data.sections) {
    return <Preloader />;
  }
  return (
    <div className="home">
      <Hero />
      {data.sections.map(({ sectionNumber, ...sectionData }, index) => {
        const SectionComponent = sectionComponents[sectionNumber];
        return SectionComponent ? (
          <SectionComponent
            key={sectionNumber}
            data={sectionData}
            sectionId={index}
            dataIndex={dataIndex}
          />
        ) : null;
      })}
    </div>
  );
}
