import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { IonSlides } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  map: any;

  mapOptions: any;

  latLng: any;
  bounds: any;
  address = {
    id: null,
    premisesNo: '',
    locality: '',
    landmark: '',
    state: '',
    city: '',
    district: '',
    country: '',
    gMapFullAddress: '',
    placeId: '',
    longitude: null,
    latitude: null,
    pincode: null,
  };

  markers: any = [];
  componentForm = {
    street_number: 'long_name',
    sublocality_level_1: 'long_name',
    sublocality_level_2: 'long_name',
    sublocality_level_3: 'long_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'long_name',
    postal_code: 'short_name'
  };
  bloggerAddress: any = [];
  input: any;
  geocoder: any;
  userPhoneNo: any;

  constructor(
    @Inject(Geolocation) public geolocation: Geolocation,
    @Inject(Router) private router: Router,
    @Inject(LoginService) private loginservice: LoginService,
    @Inject(StorageService) private storageService: StorageService,
    @Inject(AlertService) private alertService: AlertService,

  ) {
    this.userPhoneNo = this.storageService.getData('mobile');
    this.loginservice.getUserDetails(this.userPhoneNo).subscribe((res) => {

    });
  }

  ngOnInit() {
  }


  next() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  previous() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }


  // tslint:disable-next-line: use-lifecycle-interface
  async ngAfterViewInit() {
    // this.loadMap();
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {

      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(position);

      this.mapOptions = {
        center: this.latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        // scaleControl: false,
        fullscreenControl: false
      };
      this.initAutocomplete();

    }, (err) => {
      console.log(err);

    });


  }

  initAutocomplete() {
    this.map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
    // tslint:disable-next-line: new-parens
    this.geocoder = new google.maps.Geocoder();
    // Create the search box and link it to the UI element.
    this.input = document.getElementById('autocomplete');

    const searchBox = new google.maps.places.SearchBox(document.getElementById('autocomplete'), {
      fields: [ 'opening_hours', 'utc_offset_minutes'], types: ['(address)'], componentRestrictions: { country: 'In' }
    });
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.input);

    // Bias the SearchBox results towards current map's viewport.
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds());
    });

    searchBox.addListener('places_changed', () => {
      this.bloggerAddress = [];
      const places = searchBox.getPlaces();
      this.bloggerAddress = places[0];
      this.address.latitude = places[0].geometry.location.lat();
      this.address.longitude = places[0].geometry.location.lng();
      this.address.placeId = places[0].place_id;
      this.address.gMapFullAddress = JSON.stringify(places[0].address_components);

      console.log(places);
      if (places.length === 0) {
        return;
      }

      this.setAddress(searchBox);


      this.changeMapHieght('50vh');

    });


  }

  setAddress(searchBox?) {
    // Clear out the old markers.
    console.log(searchBox);

    // Clear out the old markers.
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers = [];





    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.bloggerAddress.address_components.length; i++) {
      const addressType = this.bloggerAddress.address_components[i].types[0];
      if (this.componentForm[addressType]) {
        console.log(this.bloggerAddress.address_components[i][this.componentForm[addressType]]);

        if (addressType === 'postal_code') {
          this.address.pincode = this.bloggerAddress.address_components[i][this.componentForm[addressType]] || '';

        }


        if (addressType === 'country') {
          this.address.country = this.bloggerAddress.address_components[i][this.componentForm[addressType]] || '';

        }



        if (addressType === 'administrative_area_level_1') {
          this.address.state = this.bloggerAddress.address_components[i][this.componentForm[addressType]] || '';

        }



        if (addressType === 'locality') {
          this.address.district = this.bloggerAddress.address_components[i][this.componentForm[addressType]] || '';

        }

        if (addressType === 'street_number') {
          this.address.premisesNo = this.bloggerAddress.address_components[i][this.componentForm[addressType]] || '';

        }
        if (addressType === 'route') {
          this.address.landmark = this.bloggerAddress.address_components[i][this.componentForm[addressType]] || '';

        }

        if (addressType === 'neighborhood') {
          this.address.landmark += '  ' + this.bloggerAddress.address_components[i][this.componentForm[addressType]] || '';

        }
        if (addressType === 'sublocality_level_3') {
          this.address.locality = this.bloggerAddress.address_components[i][this.componentForm[addressType]] || '';

        }



        if (addressType === 'sublocality_level_2') {
          this.address.locality += '  ' + this.bloggerAddress.address_components[i][this.componentForm[addressType]];

        }



        if (addressType === 'sublocality_level_1') {
          this.address.city = this.bloggerAddress.address_components[i][this.componentForm[addressType]];

        }

      }
    }

    this.setMarkerOnMap();
    if (searchBox) {

      google.maps.event.addListener(this.map, 'bounds_changed', () => {
        this.bounds = this.map.getBounds();
        searchBox.setBounds(this.bounds);
      });
    }
  }


  setMarkerOnMap() {
    this.bounds = new google.maps.LatLngBounds();

    let infoWindow: any;


    const marker = new google.maps.Marker({
      map: this.map,
      title: this.bloggerAddress.name,
      position: this.bloggerAddress.geometry.location,
      draggable: true,
    });
    marker.setAnimation(4);
    this.markers.push(marker);
    infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.setContent(marker.title);
      infoWindow.open(this.map, marker);
    });
    google.maps.event.addListener(marker, 'mouseover', () => {
      // infoWindow.setContent(marker.title);
      console.log('mouseover');

      // infoWindow.open(this.map, marker);
    });
    google.maps.event.addListener(marker, 'dragend', (event) => {
      // infoWindow.setContent(marker.title);
      const latlng = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      this.geocoder.geocode({ location: latlng }, (results, status) => {
        console.log(status);
        if (status === 'OK') {
          this.bloggerAddress = results[0];
          this.setAddress();
        }
        console.log(results);
      });
    });
    google.maps.event.addListener(marker, 'dragstart', () => {
      // infoWindow.setContent(marker.title);
      console.log('dragstart');

      // infoWindow.open(this.map, marker);
    });
    this.bounds.extend(this.bloggerAddress.geometry.location);

    this.map.fitBounds(this.bounds);
    this.map.setZoom(17);
  }

  changeMapHieght(val) {

    (document.getElementById('map') as HTMLInputElement).style.height = val;

  }
  saveAddress() {

    if (this.address.premisesNo.length < 2) {
      this.alertService.showErrorAlert('Please Fill Premise No');
      return;
    }

    if (this.address.locality.length < 2) {
      this.alertService.showErrorAlert('Please Fill Locality');
      return;
    }

    if (this.address.landmark.length < 2) {
      this.alertService.showErrorAlert('Please Fill LandMark');
      return;
    }

    if (this.address.placeId.length < 2) {
      this.alertService.showErrorAlert('Somthing wents wrong Please search again restaurant on map');
      return;
    }

    this.loginservice.updateBloggerDetails({
      mobile: this.userPhoneNo,
      stage: 3,
      address: this.address,
      gMapFullDetail: JSON.stringify(this.bloggerAddress)
    }).subscribe((res) => {
      if (res.status === 200) {

        this.storageService.storeData('stage', res.data.stage);
        this.router.navigateByUrl('/registration');


      }

    });


  }
}
