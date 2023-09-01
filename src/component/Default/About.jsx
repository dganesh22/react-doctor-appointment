import React from 'react'

function About() {
  return (
    <section id='hero'>
        <div className="container-fluid" id="about">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-lg-6 mt-3">
              <img src="https://res.cloudinary.com/dgn1jgwfg/image/upload/v1692958167/images/doctors_rllb0h.svg" alt="no image" className="img-fluid" />
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12">
                <h6 className="text-secondary">About</h6>
                <h3 className="display-3 text-success">
                  Experienced Doctors
                </h3>
                <p className="text-secondary">
                Experienced doctors in the respective field play a critical role in providing quality Health care to patients, with their extensive knowledge and expertise.
                </p>

                <ul class="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Vision</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Mission</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Strategy</button>
                    </li>
                  </ul>
                  <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                        <div className="card">
                          <div className="card-body">
                              <h5 className="text-success text-center">Vision</h5>
                              <p className="text-secondary">
                              There are many benefits to maintaining good health care. Here are some of the key benefits of health care:
                              </p>
                          </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="text-success text-center">Mission</h5>
                              <p className="text-secondary">
                              There are many benefits to maintaining good health care. Here are some of the key benefits of health care:
                              </p>
                          </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="text-success text-center">Strategy</h5>
                              <p className="text-secondary">
                              There are many benefits to maintaining good health care. Here are some of the key benefits of health care:
                              </p>
                          </div>
                        </div>
                    </div>
                  </div>


            </div>
          </div>
        </div>
    </section>
  )
}

export default About
