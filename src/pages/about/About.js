import "./About.css";
import img1 from "../../assets/img/about1.jpeg";
import img2 from "../../assets/img/about2.jpg";
import { Link } from "react-router-dom";

export default function About({ data }) {
  return (
    <section className="inner-page">
      <section id="skills" className="skills">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div
              className="col-lg-6 d-flex align-items-center"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <img src={img1} className="img-fluid" alt="" />
            </div>
            <div
              className="col-lg-6 pt-4 pt-lg-0 content"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <h3>WHO WE ARE</h3>
              <p>
                Shared Values Foundation (SVF) was founded and registered in
                Kenya as a Non-Governmental Organization in the year 2014.
                Shared Values Foundation draws its inspiration from the global
                sustainable development agenda under the Social Responsibility
                ISO 26000 guidelines issued in Geneva in November 2012. With our
                SCAPII values (see below) as the guiding beacon of light to all
                our personnel, well-wishers, agents and collaborators pursue
                equity for humanity; never discriminating against anyone in the
                sharing of the benefits of our charitable and social-benefit
                programmes.
              </p>
              <p className="mt-4">
                To achieve this, we build synergies with existing programs and
                create networks of people and organizations who cherish our
                values. Since its incorporation in 2014 to date, SVF has with
                the support of coroporate and individual donors such as African
                Cirrcle of Hope Foundation, Gstaad Rotary Club in Switzerland,
                Manu Chandaria Foundation, Lindberg Holidays and Safaris,
                Kenyatta and Muriranjas (Muranga) hospital medical staff and
                individual chemists made some progress in its mission through
                work with communities in Meru, Nairobi and Muranga counties.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div
              className="col-lg-6 order-1 order-lg-2 d-flex align-items-center"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <img src={img2} className="img-fluid" alt="" />
            </div>
            <div
              className="col-lg-6 order-2 order-lg-1 pt-4 pt-lg-0 content"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <p>
                The work include support to improve sanitation at St. Lucy’s
                Primary School for the Blind in Igoji, Meru, through
                construction of ablution block and bathrooms for 300 pupils and
                teachers; donated food to to needy community groups during
                COVID-19 to over 550 people, paid fees and school levies for
                over 300 secondary school students from Mathare slums Nairobi
                (30 per year per year), supported about 1800 in-school and
                out-of-school girls in difficult circumstances with menstrual
                hygiene management mainly through supply of sanitary pads and;
                accompanying coaching, mentoring and life skills and organized
                medical camp in Muranga with the support of doctors from
                Kenyatta National Hospital and Miriranjas hospital (Muranga),
                some private clinics and chemists benefiting about 500 people
                with general check-ups and dental health.
              </p>
              <p className="mt-4">
                Furthermore, we conducted an FGM survey in Samburu and visited
                FGM survivors rescue center and engaged inmates at the center
                gaining a clearer understanding of the issues surrounding FGM
                for better programming as we extend to all the 21 FGM hotspot
                counties across Kenya. Other key needs of children, youth and
                women especially, poor access to education especially for girls;
                child marriages, child labour , poor livelihoods systems and
                environmental and climate concerns. Our key challenge is that
                the needs of our target populations are overwhelmingly amidst
                scarce resources . We need your support to tackle the known
                needs and as we extend to 19 counties that SFV is registered to
                work in. Below are directions on how you can support our work
                and change a life. Read the story of one needy girl from
                Samburu, known as Nasike Lengupae who has since become the face
                of the suffering gilrs, and understand what the girls go through
              </p>
              <Link to="/nasike" className="btn-learn-more">
                Read About nasike
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
