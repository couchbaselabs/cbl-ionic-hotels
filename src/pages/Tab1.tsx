import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
} from "@ionic/react";

import { useState, useEffect, useContext } from "react";
import DatabaseServiceContext from '../providers/DatabaseServiceContext';
import { Hotel } from '../models/hotel';

import { bookmark, bookmarkOutline } from "ionicons/icons";
import "./Tab1.css";

const Tab1: React.FC = () => {

  //get database service from context
  const { databaseService } = useContext(DatabaseServiceContext);

  //set state for managing information displayed on the screen
  const [toggleBookmarkFilter, setToggleBookmarkFilter] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [hotelsDisplayed, setHotelsDisplayed] = useState([]);

  //run effect when page first loads only
  useEffect(() => {
    const fetchHotels = async () => {
      try {
      const hotels = await databaseService.getHotels();
      setHotels(hotels);
      setHotelsDisplayed(hotels);
      } catch (error) {
        console.log(`Error: ${error}`); 
      }
    };
    fetchHotels(); 
  }, []);

  //handle when the top toolbar button is clicked
  const toggleShowBookmarks = () => {
    setToggleBookmarkFilter(!toggleBookmarkFilter);
    if (toggleBookmarkFilter) {
      setHotelsDisplayed(hotels);
    } else {
      setHotelsDisplayed(hotels.filter(hotel => hotel.bookmarked));
    }
  };

  //handle when a bookmark button is clicked on a given hotel
  const bookmarkHotel = async (hotel: Hotel, index: number) => {
    hotel.bookmarked = !hotel.bookmarked;

    if (hotel.bookmarked) {
      await databaseService.bookmarkHotel(hotel.id);
    }
    else {
      await databaseService.unbookmarkHotel(hotel.id);
    }
    const updatedHotels = [...hotelsDisplayed];
    updatedHotels[index].bookmarked = hotel.bookmarked;
    setHotelsDisplayed(updatedHotels);
  };

  //handle someone seaarching for a hotel
  const doSearch = async (event: CustomEvent) => {
    const searchText = event.detail.value;
    if (searchText === "") {
      setHotelsDisplayed(hotels);
    } else {
      const searchResults  = await databaseService.searchHotels(searchText);
      setHotelsDisplayed(searchResults);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hotels</IonTitle>
          <IonButtons slot="end" key="right-side-buttons-key">
            <IonButton onClick={toggleShowBookmarks} key="button-bookmark-key">
              <IonIcon
                key="icon-bookmark-key"
                aria-hidden="true"
                icon={toggleBookmarkFilter ? bookmark : bookmarkOutline} 
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Hotels</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar 
          placeholder="Search Name"
          autocapitalize="off"
          onIonClear={() => setHotelsDisplayed(hotels)}
          onIonChange={doSearch} />
        <IonList lines="none">
        { 
        hotelsDisplayed.length > 0 ? (
        hotelsDisplayed.map((hotel, index) => (
          <IonItem key={`item-${index}`}>
            <IonCard key={`card-${index}`} style={{ width: "100%" }}>
              <IonCardHeader key={`card-header-${index}`}>
                <IonCardTitle key={`card-tile-${index}`}>{hotel.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent key={`card-content-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div key={`card-div-${index}`}>
                  <IonLabel key={`card-label-address-${index}`}>{hotel.address}</IonLabel>
                  <IonLabel key={`card-label-phonenumber-${index}`}>{hotel.phone}</IonLabel>
                </div>
                <IonButton 
                key={`card-button-bookmark${index}`} fill="clear"
                onClick={() => bookmarkHotel(hotel, index)}>
                  <IonIcon key={`card-button-icon-${index}`} icon={hotel.bookmarked ? bookmark : bookmarkOutline}  />
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonItem>
        ))) : (
          <IonItem>
            <IonLabel>No Hotels Found</IonLabel>
          </IonItem>)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
