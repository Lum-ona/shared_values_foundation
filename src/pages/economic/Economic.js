import React from "react";
import img1 from "../../assets/img/PROGRAMMES/socio/p1.png";
import img2 from "../../assets/img/PROGRAMMES/socio/p3.png";

export default function Economic({ data }) {
  return (
    <section className="inner-page">
      <section id="programmes" className="portfolio-details">
        <div className="section-title">
          <h2>Socio-Economic Empowerment.</h2>
        </div>
        <div className="container" data-aos="fade-up">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="portfolio-details-slider swiper">
                <div className="swiper-wrapper align-items-center">
                  <div className="swiper-slide">
                    <img src="" alt="" />
                  </div>

                  <div className="swiper-slide">
                    <img src={img1} alt="" />
                  </div>

                  <div className="swiper-slide">
                    <img src={img2} alt="" />
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
              <p>
                These activities being mainly the sole source income are
                affected by frequent drought conditions associated with climate
                change and its aftershocks seriously affecting community food
                security, incomes and livelihoods and their ability to cope and
                adapt to the rapidly changing and unpredictable weather patterns
                largely becoming unsustainable and leaving them exposed to a
                cycle of poverty.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="portfolio-description">
                <p>
                  Most of them are lack the requisite financial resources or
                  household assets and capacities and skills to scale their
                  faming activities and related enterprises.
                </p>
                <p>
                  Communities in about 8 of SVF’s target counties (Kiambu,
                  Muranga, Meru, Nakuru, Nandi, and Uasin Gishu, Tharaka Nithi
                  and Narok are mainly or semi-agricultural or agro-pastoralists
                  who produce food for subsistence as well as agri-preneurship.
                  The remaining counties largely depend on pastoralism or
                  agro-pastoralism with various micro and small enterprises
                  mainly agro-based such as bee keeping, agro-forestry, crop
                  value addition et cetera.
                </p>
                <p>
                  To support turn around with these challenges, SVF engages
                  communities in building on-farm and off farm livelihoods
                  activities for youth, men, and women and assets required to
                  ensure sustainability of livelihoods. We build their
                  capacities in sustainable agriculture through training on
                  modern methods of farming, use of modern technologies ,
                  sustainable alternative energy sources and water harvesting
                  techniques including setting up of small-scale irrigation
                  systems of enabling communities to produce food during the dry
                  periods. We also bring partners to source capital for grant
                  financing and credit
                </p>
                <p>
                  Moreover, SVF trains farmers on climate change preparedness,
                  mitigation and adaptation; for example, imparting them with
                  knowledge on choice of drought resistant crops, water
                  harvesting methods, agro-forestry and tree planting for
                  environmental conservation and reduction of greenhouse gases,
                  thereby moderating micro-climates in their favour. More
                  importantly , we link our farmers to ready markets avoiding
                  middle men who exploit them at farm gate. Finally, we
                  collaborate with the line government departments and relevant
                  NGOs to provide business training aimed at removing barriers
                  and enhancing enablers influencing the adoption of livelihood
                  adaptation options for vulnerable individuals, households, and
                  groups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
