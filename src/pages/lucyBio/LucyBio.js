import React from "react";
import img1 from "../../assets/img/team/lucy.jpeg";

export default function LucyBio({ data }) {
  return (
    <section className="inner-page">
      <section id="programmes" className="portfolio-details">
        <div className="container" data-aos="fade-up">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="portfolio-details-slider swiper">
                <div className="swiper-wrapper align-items-center">
                  <div className="swiper-slide">
                    <img
                      src={img1}
                      alt=""
                      style={{ maxHeight: "70vh", objectFit: "contain" }}
                    />
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
              <p>
                I was born and raised in a humble family. My peasant parents
                eked a living from small scale, back-breaking coffee and tea
                farming, which barely met our family needs. I went through
                school through the help of the Catholic Church without which
                help would not be who I am now; with a discent house and good
                education for my children, I owe it t to the late Bishop of Meru
                Catholic Diocese, His Lordship, Silas Njiru.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="portfolio-description">
                <p>
                  Before my father Japhet Kiria died, back in 2013 he donated a
                  piece of land to the Catholic Diocese of Meru as an
                  appreciation for support given to me expressing his wish that
                  the church would put up a player house and a kindergarten to
                  save the children and the elderly the trouble of walking a
                  long distances to the nearest churches and schools. This is to
                  say, the church gave to me and he in turn my father gave to
                  the church so that more in the community could benefit.
                </p>
                <p>
                  This act both surprised me and moved me in equal measure. It
                  surprised me because my community is so attached to land, (the
                  soil) that it is unheard of, for anyone to just give it out
                  like that, for free! In fact, many in our neighborhood
                  considered my father a fool for his bold decision. That
                  notwithstanding, the gesture engendered in me a giving spirit;
                  i felt that this thread needed to continue unbroken and so, I
                  late thought, other disadvantaged children should have at
                  least an education like me and like my own children have.
                </p>
                <p>
                  I needed some form of a vehicle through which to do that. I
                  thought of a non-profit organization to be that vehicle. My
                  husband, Charles and our children shared in my dream and so
                  they egged me on. This became my dream, drive and burning
                  desire. The moment came in November 2012. I happened to attend
                  the Social Responsibility ISO 2600 in Geneva, Switzerland as
                  an expert representing my country Kenya.
                </p>
                <p>
                  This was in the company of my now late co-founder Dr. Gabriel
                  Minder, who ignited the ultimate switch. Minder convinced me
                  that a foundation dedicated to shared values was the way to
                  go. With his material and moral support, henceforth, SVF was
                  born. Today my joy and that of my family, friends and
                  well-wishers, derives from putting and seeing a smile in the
                  faces of children, women and men alike courtesy of our modest
                  support. I am sincerely grateful to the SVF team that
                  actualized the dream, we soldier on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
