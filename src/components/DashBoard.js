import React from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

function DashBoard() {

  let navigate = useNavigate();


  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate("/")
    }else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])

  return (
    
    <div>
              

        <main id="main" className="main">

          <div className="pagetitle">
            <h1>Dashboard</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </nav>
          </div>
          {/* <!-- End Page Title --> */}

          <section className="section dashboard">
            <div className="row">

              {/* <!-- Left side columns --> */}
              <div className="col-lg-8">
                <div className="row">


                                    {/* <!-- Top Selling --> */}
                                    <div className="col-12">
                    <div className="card top-selling overflow-auto">

                      <div className="filter">
                        <Link className="icon" to="/" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                          </li>

                          <li><Link className="dropdown-item" to="/">Today</Link></li>
                          <li><Link className="dropdown-item" to="/">This Month</Link></li>
                          <li><Link className="dropdown-item" to="/">This Year</Link></li>
                        </ul>
                      </div>

                      <div className="card-body pb-0">
                        <h5 className="card-title">Top Selling <span>| Today</span></h5>

                        <table className="table table-borderless">
                          <thead>
                            <tr>
                              <th scope="col">Preview</th>
                              <th scope="col">Product</th>
                              <th scope="col">Price</th>
                              <th scope="col">Sold</th>
                              <th scope="col">Revenue</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row"><Link to="/"><img src="https://fiverrbox.com/wp-content/uploads/2021/12/nft-art.jpg-5-2c4a6d40.jpg" alt="Img1" /></Link></th>
                              <td><Link to="/" className="text-primary fw-bold">Ut inventore ipsa voluptas nulla</Link></td>
                              <td><i className="fa-brands fa-ethereum mx-1"></i>6.422</td>
                              <td className="fw-bold">124</td>
                              <td><i className="fa-brands fa-ethereum mx-1"></i>582.8882</td>
                            </tr>
                            <tr>
                              <th scope="row"><Link to="/"><img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2021/05/merlin_184196631_939fb22d-b909-4205-99d9-b464fb961d32-superJumbo.jpeg?auto=format&q=60&fit=max&w=930" alt="Img2" /></Link></th>
                              <td><Link to="/" className="text-primary fw-bold">Exercitationem similique doloremque</Link></td>
                              <td><i className="fa-brands fa-ethereum mx-1"></i>6.333</td>
                              <td className="fw-bold">98</td>
                              <td><i className="fa-brands fa-ethereum mx-1"></i>450.2508</td>
                            </tr>
                            <tr>
                              <th scope="row"><Link to="/"><img src="https://jingdaily.com/wp-content/uploads/2021/03/Beeple-christies-NFT-art-1240x697.jpg" alt="Img3" /></Link></th>
                              <td><Link to="/" className="text-primary fw-bold">Doloribus nisi exercitationem</Link></td>
                              <td><i className="fa-brands fa-ethereum mx-1"></i>5.8875</td>
                              <td className="fw-bold">74</td>
                              <td><i className="fa-brands fa-ethereum mx-1"></i>436.2466</td>
                            </tr>
                            <tr>
                              <th scope="row"><Link to="/"><img src="https://cdn.kwork.com/pics/t3/62/19339480-1659902860.webp" alt="Img4" /></Link></th>
                              <td><Link to="/" className="text-primary fw-bold">Officiis quaerat sint rerum error</Link></td>
                              <td><i className="fa-brands fa-ethereum mx-1"> </i>3.9472</td>
                              <td className="fw-bold">63</td>
                              <td><i className="fa-brands fa-ethereum mx-1"> </i>201.7836</td>
                            </tr>
                            <tr>
                              <th scope="row"><Link to="/"><img src="https://justcreative.com/wp-content/uploads/2022/04/best-nft-art.jpg" alt="Img5" /></Link></th>
                              <td><Link to="/" className="text-primary fw-bold">Sit unde debitis delectus repellendus</Link></td>
                              <td><i className="fa-brands fa-ethereum mx-1"></i>3.8546</td>
                              <td className="fw-bold">41</td>
                              <td><i className="fa-brands fa-ethereum mx-1"></i>323.9879</td>
                            </tr>
                          </tbody>
                        </table>

                      </div>

                    </div>
                  </div>
                  {/* <!-- End Top Selling --> */}


                  {/* <!-- Sales Card --> */}
                  <div className="col-xxl-4 col-md-6">
                    <div className="card info-card sales-card">

                      <div className="filter">
                        <Link className="icon" to="/" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                          </li>

                          <li><Link className="dropdown-item" to="/">Today</Link></li>
                          <li><Link className="dropdown-item" to="/">This Month</Link></li>
                          <li><Link className="dropdown-item" to="/">This Year</Link></li>
                        </ul>
                      </div>

                      <div className="card-body">
                        <h5 className="card-title">Today</h5>

                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="ri-account-circle-line fs-1"></i>
                          </div>
                          <div className="ps-3">
                            <h6>145</h6>
                            <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  {/* <!-- End Sales Card --> */}

                  {/* <!-- Revenue Card --> */}
                  <div className="col-xxl-4 col-md-6">
                    <div className="card info-card revenue-card">

                      <div className="filter">
                        <Link className="icon" to="/" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                          </li>

                          <li><Link className="dropdown-item" href="/">Today</Link></li>
                          <li><Link className="dropdown-item" href="/">This Month</Link></li>
                          <li><Link className="dropdown-item" href="/">This Year</Link></li>
                        </ul>
                      </div>

                      <div className="card-body">
                        <h5 className="card-title">Revenue <span>| This Month</span></h5>

                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-currency-dollar"></i>
                          </div>
                          <div className="ps-3">
                            <h6>$3,264</h6>
                            <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  {/* <!-- End Revenue Card --> */}

                  {/* <!-- Customers Card --> */}
                  <div className="col-xxl-4 col-xl-12">

                    <div className="card info-card customers-card">

                      <div className="filter">
                        <Link className="icon" to="/" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                          </li>

                          <li><Link className="dropdown-item" to="/">Today</Link></li>
                          <li><Link className="dropdown-item" to="/">This Month</Link></li>
                          <li><Link className="dropdown-item" to="/">This Year</Link></li>
                        </ul>
                      </div>

                      <div className="card-body">
                        <h5 className="card-title">Customers <span>| This Year</span></h5>

                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-people"></i>
                          </div>
                          <div className="ps-3">
                            <h6>12544</h6>
                            <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                  {/* <!-- End Customers Card --> */}




                </div>
              </div>
              {/* <!-- End Left side columns --> */}


              {/* <!-- Right side columns --> */}
              <div className="col-lg-4">


                {/* <!-- News & Updates Traffic --> */}
                <div className="card">
                  <div className="filter">
                    <Link className="icon" to="/" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                      </li>

                      <li><Link className="dropdown-item" to="/">Today</Link></li>
                      <li><Link className="dropdown-item" to="/">This Month</Link></li>
                      <li><Link className="dropdown-item" to="/">This Year</Link></li>
                    </ul>
                  </div>

                  <div className="card-body pb-0">
                    <h5 className="card-title">News &amp; Updates <span>| Today</span></h5>

                    <div className="news">
                      <div className="post-item clearfix">
                        <img src="assets/img/news-1.jpg" alt="" />
                        <h4><Link to="/">Nihil blanditiis at in nihil autem</Link></h4>
                        <p>Sit recusandae non aspernatur laboriosam. Quia enim eligendi sed ut harum...</p>
                      </div>

                      <div className="post-item clearfix">
                        <img src="assets/img/news-2.jpg" alt="" />
                        <h4><Link to="/">Quidem autem et impedit</Link></h4>
                        <p>Illo nemo neque maiores vitae officiis cum eum turos elan dries werona nande...</p>
                      </div>

                      <div className="post-item clearfix">
                        <img src="assets/img/news-3.jpg" alt="" />
                        <h4><Link to="/">Id quia et et ut maxime similique occaecati ut</Link></h4>
                        <p>Fugiat voluptas vero eaque accusantium eos. Consequuntur sed ipsam et totam...</p>
                      </div>

                      <div className="post-item clearfix">
                        <img src="assets/img/news-4.jpg" alt="" />
                        <h4><Link to="/">Laborum corporis quo dara net para</Link></h4>
                        <p>Qui enim quia optio. Eligendi aut asperiores enim repellendusvel rerum cuder...</p>
                      </div>

                      <div className="post-item clearfix">
                        <img src="assets/img/news-5.jpg" alt="" />
                        <h4><Link to="/">Et dolores corrupti quae illo quod dolor</Link></h4>
                        <p>Odit ut eveniet modi reiciendis. Atque cupiditate libero beatae dignissimos eius...</p>
                      </div>

                    </div>
                    {/* <!-- End sidebar recent posts--> */}

                  </div>
                </div>
                {/* <!-- End News & Updates --> */}

              </div>
              {/* <!-- End Right side columns --> */}

            </div>
          </section>

        </main>
        {/* <!-- End #main --> */}

    </div>
  )
}

export default DashBoard
