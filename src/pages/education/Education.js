import React from "react";
import img1 from "../../assets/img/PROGRAMMES/education/p1.png";
import img2 from "../../assets/img/PROGRAMMES/education/p2.png";
import img3 from "../../assets/img/PROGRAMMES/education/p3.png";

export default function Education({ data }) {
  return (
    <section className="inner-page">
      <section id="programmes" className="portfolio-details">
        <div className="section-title">
          <h2>Quality and Equitable Education.</h2>
        </div>
        <div className="container" data-aos="fade-up">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="portfolio-details-slider swiper">
                <div className="swiper-wrapper align-items-center">
                  <div className="swiper-slide">
                    <img src={img1} alt="" />
                  </div>

                  <div className="swiper-slide">
                    <img src={img2} alt="" />
                    <em>SVF CEO Lucy, St Lucy’s school for the blind’</em>
                  </div>

                  <div className="swiper-slide">
                    <img src={img3} alt="" />
                    <em>Pupils at sent lucy’s school for the blind</em>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
              <p>
                Amidst the aforementioned challenges, education is the sure
                equalizer. Shared Values Foundation works to enhance access to
                quality and equitable education for vulnerable, underprivileged,
                marginalized, children of absentee parents such as incarcerated
                mothers, orphans and disabled children. We work with local
                government administration and the Ministry of Education
                structure for policy direction, planning data, standards and
                quality control, and leveraging available resources. Important
                data for planning in this respect include an understanding of,
                and information on access, attendance, drop outs, transition and
                completion rates for children, contextually looking at the
                disadvantaged gender who suffer common and sometimes varied
                barriers with respect to the indicators just listed.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="portfolio-description">
                <p>
                  To alleviate the barriers SVF intervenes by supporting the
                  children with basic needs such as learning materials, learning
                  technologies ( click for an example) school uniform, school
                  levies, sanitary pads for teenage girls, life-skills
                  development and role modeling, coaching and mentoring, career
                  guidance, holiday reading camps, psychosocial support for
                  survivors of negative cultural practices and Sexual and Gender
                  Based Violence (SGBV). To address social and cultural barriers
                  to education, we mobilize the community and create awareness
                  and sensitization on the importance of education for both
                  genders, hold conversations on the dangers and need to cede
                  some of the retrogressive cultural beliefs and practices (such
                  as FGM, early/child marriages and beading for girls and child
                  labour), lobby them to support school infrastructure
                  development, school levies, home study and child protection.
                </p>
                <p>
                  We collaborate with partners in the sector for collective
                  impact, avoidance of duplication of efforts and, together,
                  facilitate strengthening of local capacity in education. We
                  embrace the public-private and people partnerships (PPPP) for
                  innovations and technology integration in education, speeding
                  up of change, and taking our and collective successes to
                  scale. Our support is meant to bridge gaps supporting children
                  and youth to transition through three education pathways;
                  formal, non-formal and vocational.
                </p>
                <p>
                  Whereas our aim is to get as many children as possible through
                  the formal pathway in line with the government’s goal of 100%
                  transition of children from primary to secondary and onward to
                  college, we also support those who choose the vocational
                  pathway with resources to complete training and support them
                  to sustainably invest the skills acquired in business and
                  self-employment. Moreover, SVF supports linkages for graduates
                  from the formal education pathway with for internships and
                  job-experience building and those from TVETs and non-formal
                  pathways with financiers and credit sources and relevant
                  government programmes for sustainability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
