import React, { Component } from "react";
import { Link } from "react-router-dom";
import { customerLogoutFetch } from '../actions/customerActions';
import { connect } from 'react-redux';
import '../App.css';
import providerDataService from "../services/provider.service";
// import AliceCarousel from 'react-alice-carousel';
// import "react-alice-carousel/lib/alice-carousel.css";


// import axios from 'axios' // just for testing getData()


class HomeScreen extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        masternotProviders: [],
        REACT_APP_URL:  process.env.REACT_APP_URL,
        // galleryItems: [<a href="http://localhost:8081/filterproducts/0?retail=-1&category=50"> <img className="sliderimg" src="http://localhost:8080/avatars/chutcheo.jpg" /> </a>, <a href="http://localhost:8081/filterproducts/0?retail=-1&category=33"> <img className="sliderimg" src="http://localhost:8080/avatars/BestSeller.jpg" /> </a>, <a href="http://localhost:8081/filterproducts/0?retail=-1&category=28"> <img className="sliderimg" src="http://localhost:8080/avatars/ManagerSpecial.jpg" /> </a>, <a href="http://localhost:8081/filterproducts/0?retail=-1&category=28"> <img className="sliderimg" src="http://localhost:8080/avatars/PromoCode.jpg" /> </a> ] ,
        // galleryItems: [<a href="/filterproducts/0?retail=-1&category=50"> <img className="sliderimg" src="/avatars/chutcheo.jpg" /> </a>, <a href="http://localhost:8081/filterproducts/0?retail=-1&category=33"> <img className="sliderimg" src="http://localhost:8080/avatars/BestSeller.jpg" /> </a>, <a href="http://localhost:8081/filterproducts/0?retail=-1&category=28"> <img className="sliderimg" src="http://localhost:8080/avatars/ManagerSpecial.jpg" /> </a>, <a href="http://localhost:8081/filterproducts/0?retail=-1&category=28"> <img className="sliderimg" src="http://localhost:8080/avatars/PromoCode.jpg" /> </a> ] ,
        galleryItems: null,
        lettersArray: ["A","B","C","D","E","G","H","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y"],
        isadmin: 1
      }
  }

  componentWillMount() {
    var str1 = this.state.REACT_APP_URL + "avatars/chutcheo.jpg"
    var str2 = this.state.REACT_APP_URL + "avatars/ManagerSpecial.jpg"
    var str3 = this.state.REACT_APP_URL + "avatars/PromoCode.jpg"
    // console.log('str1 ' + str1);
    
    this.setState({
      galleryItems: [<a href="/filterproducts/0?retail=-1&category=50"> <img className="sliderimg" src={str1} alt="galery"/> </a>, <a href="http://localhost:8081/filterproducts/0?retail=-1&category=28"> <img className="sliderimg" src="http://localhost:8080/avatars/BestSeller.jpg" alt="galery"/> </a>, <a href="/filterproducts/0?retail=-1&category=49"> <img className="sliderimg" src={str2} alt="galery"/> </a>, <a href="/filterproducts/0?retail=-1&category=28"> <img className="sliderimg" src={str3} alt="galery"/> </a> ]
    });
    // this.getData() // tesing carousel only
    this.retrieveNotMasterProviders();
  }

  retrieveNotMasterProviders() {
    providerDataService.getNotMaster()
      .then(response => {
        this.setState({
          masternotProviders: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // chi de dot dong lap FOR chu khong lam gi ra hon ca
  showAZ() {
    // var letters = "ABCDEGHIKLMNOPQRSTUVXY";
    var letters = "ABCD";
    var nextCharList = ""
    // var alphabetList = ""
    for (var i = 0; i < letters.length; i++) {
      var nextChar = letters.charAt(i);
      // var letter = "<div class='col-md-3 col-sm-3 col-xs-12'><div id='" + nextChar + "'><h2>" + nextChar + "</h2></div></div>";
      nextCharList = nextCharList + "<Link to='filterproducts/:usvn_longtiengin'>" + nextChar +  " </Link>";
    }
    return (null
      // <div>
      //     {nextCharList}
      //     <Link to="filterproducts/:usvn_longtiengin">{nextCharList}</Link>
      // </div>
    )

    
  }

  // vi du la getData lay hinh tu backend
      // getData (){
      //   axios.get(`https://picsum.photos/v2/list?limit=6`, {})
      //       .then(res => {
      //               const data = res.data
      //             const img = data.map(m => 
      //               <img src={m.download_url} alt=""/>
      //             )
      //             console.log('img neee ' + JSON.stringify(img))
      //             this.setState({
      //               galleryItems: img
      //             })
      //           }).catch((error) => {
      //               console.log(error)
      //           })
      // }
  // --- End getData() - vi du la getData lay hinh tu backend

  responsive = {
    0: { items: 1 },
    256: { items: 2 },
  }

  logoutHandler = (e) => {
    e.preventDefault();
    this.props.customerLogoutFetch();
    this.props.history.push("/");
  }

  render() {
    // const { currCustomer } = this.state;

    return (
      <div className="profile-info">
        <br></br>
        <br></br>
        
        <div>
          {this.showAZ()}
        </div>
        <div className="home-info"> 
              <div >
                  <Link to="filterproducts/-1?usvn_longtieng=0">Browse All Products</Link>
              </div>
              or Select by alphabet : 
                {this.state.lettersArray.map((letter) => 
                      <a href={'/filterproducts/'+this.state.usvn_longtieng+'?retail=-1&search_abc='+ letter}>    {letter}   </a>
                )}
        </div>

        <br></br>

        {/* <div>
            <AliceCarousel 
                items={this.state.galleryItems}
                responsive={this.responsive}
                autoPlayInterval={2000}
                autoPlayDirection="rtl"
                autoPlay={true}
                fadeOutAnimation={true}
                mouseTrackingEnabled={true}
                disableAutoPlayOnAction={true}
            />
        </div> */}
        <div className="home-info">
            <h2>We have movies from many companies. Most of them are translated in Vietnamese in USA, like: </h2>
            {this.state.masternotProviders.map((masterProvider) => 
              <span >
                <a href={'/filterproducts/'+this.state.usvn_longtieng+'?retail=-1&provider='+ masterProvider.id}>{masterProvider.providers_name} {' '}</a>
              
              </span>
            )}
        </div>

        <br></br>
        
          <div className="row">
              <div className="header" style={{width: '25rem', height: '50rem'}}>
                <div className="card-body">
                  <h2 className="card-title">Digital format</h2>
                  <a href='filterproducts/0?retail=-1&category=99' className="btn-block btn-success"><img className="card-img-top" src={this.state.REACT_APP_URL + "avatars/thekylogo.png"} alt="digital" /></a>
                  <p className="card-text">We convert movie content to digital format, easy to watch in your device. (beta version, low price)</p>
                  <a href='filterproducts/0?retail=-1&category=99' className=" btn btn-primary"> See more</a>
                </div>
              </div>
              <div className="header" style={{width: '25rem', height: '50rem'}}>
                <div className="card-body">
                  <h2 className="card-title">Kiem hiep</h2>
                  <a href="/filterproducts/0?retail=-1&category=28"><img className="card-img-top" src={this.state.REACT_APP_URL + "avatars/kiemhiep.jpg"} alt="kiem" /></a>
                  <p className="card-text">Kiem hiep is always a terific category in Chinese TV series movie. Try it by click this link below...</p>
                  <a href="/filterproducts/0?retail=-1&category=28" className="btn btn-primary">See more</a>
                </div>
              </div>
              <div className="header" style={{width: '25rem', height: '50rem'}}>
                <div className="card-body">
                  <h2 className="card-title">Canh Sat Dieu Tra</h2>
                  <a href="/filterproducts/0?retail=-1&category=49"> <img className="card-img-top" src={this.state.REACT_APP_URL + "avatars/canhsat.jpg"} alt="canhsat"/> </a>
                  <p className="card-text">Canh Sat Dieu Tra is another interested category in Chinese TV series movie. Try it by click this link below...</p>
                  <a href="/filterproducts/0?retail=-1&category=49" className="btn btn-primary">See more</a>
                </div>
              </div>
          </div>


     </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  customerLogoutFetch: () => dispatch(customerLogoutFetch())
})

const mapStateToProps = (state, ownProps) => {
  console.log('customerSignin trong App.js ' + JSON.stringify(state.customerSignin.customerInfo));
  
  return {
      // currcustomer: state.customerSignin.customerInfo    // cu
      currCustomer: state.customerSignin                // moi
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

