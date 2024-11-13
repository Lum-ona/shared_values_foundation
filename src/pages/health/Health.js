import "./Health.css";
import img1 from "../../assets/img/PROGRAMMES/program1.png";
import img2 from "../../assets/img/PROGRAMMES/program2.png";
import img3 from "../../assets/img/PROGRAMMES/program3.png";

export default function Health({ data }) {
  return (
    <section className="inner-page">
      <section id="programmes" className="health-details">
        <div className="section-title">
          <h2>Basic Health and Wellbeing.</h2>
        </div>
        <div className="container" data-aos="fade-up">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="health-details-slider swiper">
                <div className="swiper-wrapper align-items-center">
                  <div className="swiper-slide">
                    <img src={img1} alt="" />
                  </div>

                  <div className="swiper-slide">
                    <img src={img2} alt="" />
                  </div>

                  <div className="swiper-slide">
                    <img src={img3} alt="" />
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
              <p>
                Communities targeted by this project have serious challenges
                accessing even the bare minimum health services while quality
                health is practically a mirage. Affected by lack of clean water
                and poor sanitation, many would be illnesses easily find abode.
                Unable to access (to afford) even the mere basic healthcare,
                most people struggle to get even the non-prescriptive
                over-the-counter generic drugs and majority, especially in the
                ASAL counties resort to traditional herbal medicine which is
                administered without the knowledge of dosage measurements.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="health-description">
                <p>
                  This is further complicated by cultural beliefs and practices.
                  All the communities and especially those in ASAL counties are
                  deeply steeped in age-old cultural beliefs and practices, some
                  of which are time-barred and have negative effects health for
                  all children and adults alike, tending to affect children,
                  girls and women more and having life-long impacts on their
                  lives. Examples are Female Genital Mutilation, forced early
                  marriages and sexual and gender-based violence and early or
                  child marriages.
                </p>
                <p>
                  Perpetual food insecurity that causes underfeeding and poor
                  diet get into play worsening community health due to
                  malnutrition, wasting and the emerging complications as a
                  result, especially for children below 5 years of age, pregnant
                  and lactating mothers and generally school-going children who
                  require good nutrition for them to remain in school,
                  concentrate and learn. There is a direct and proportional
                  correlation between good health and wellbeing of a population
                  in general; and learning for school going children.
                </p>
                <p>
                  Shared Values Foundation, works with local partners such as
                  religious organizations and groups, ministry of health,
                  community health promoters, volunteers and the local
                  administration to address cultural issues related to community
                  health. This is done through mass awareness creation via
                  platforms like physical community meetings, religious
                  meetings, piggy-backing on meetings organized by other
                  partners and stakeholder, structured community outreaches,
                  health camps. Training od trainers, mass media and social
                  media.
                </p>
                <p>
                  For sustainability, SVF works with Community Health Promoters
                  (CHPs) who have direct access of the community, basic
                  information on preventive health and direct link with and
                  reporting structure with the Ministry of Health. CHPs are
                  empowered with basic training and tools and facilitated to
                  reach the youth, women and men on reproductive health issues,
                  nutrition and preventive health among other important
                  interventions. Shared Values Foundation also works with
                  counselors to offer counselling and emotional support to FGM
                  victims. We also identify common health issues and organizes
                  medical camps within communities to address the needs. These
                  medical camps are aimed at offering free checkups treatment
                  and referrals to the under- privileged in society. We believe
                  in early assessments to identify community health needs and
                  offer early treatment and care alongside preventive health
                  massaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
