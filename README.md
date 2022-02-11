# Othello

An implemantation of the classic board game Othello

![image](https://user-images.githubusercontent.com/59425912/153607497-302444e8-af8f-4d8e-8db1-a78bd98ca90d.png)
[live link](https://ypeikes18.github.io/othello/)

## Technologies
- Javascript
- React 

## Photos 
![image](https://user-images.githubusercontent.com/63963324/150466955-c92744a9-ee2a-4f79-93ca-5066bd141ad3.png)
![image](https://user-images.githubusercontent.com/63963324/150466452-18666943-ce4a-47b0-9ea4-ed9ca08a222b.png)
![image](https://user-images.githubusercontent.com/63963324/150466625-1ddf116c-993e-42f2-b485-1985a81a04fc.png)


## Functionality 
 
- Piece flipping logic - Game logic decides whether a turn is valid and flips pieces accordingly 
- Turns - Game switches turns correctly and skips a players turn when they have no valid move 
- Winner - Game notifies the players of a winner once the game is over

## Code Snippets 

```
componentDidUpdate(prevProps){
    if (Object.values(this.props.tripEntries).length > 0){ 
        this.MarkerManager.updateMarkers(Object.values(this.props.tripEntries), true)
        this.changeZoom(Object.values(this.props.tripEntries))
    } else { 
        this.MarkerManager.updateMarkers(Object.values(this.props.entries), false)
        this.changeZoom(Object.values(this.props.entries))
    }
}
 ```
Taking advantage of the Redux state, we were able to conditionally render map markers and alter map zoom based on the user's current selection. When a 'trip' or 'entry' is selected, the Redux state is updated and the map dynamically changes. Updating the zoom and visible markes appropriately, the map is responsive to user input. 

``` 
getCorners (entrys) {
    let coordinates = [];
    let latitudes = [];
    let longitudes = [];

    for (let i = 0; i < entrys.length; i++){
        latitudes.push(parseFloat(entrys[i].location.latitude))
        longitudes.push(parseFloat(entrys[i].location.longitude))
    }
    coordinates = [Math.min(...latitudes), Math.min(...longitudes), Math.max(...latitudes), Math.max(...longitudes)]        
    return coordinates;
}  
```
getCorners is a function handling the minimum and maximum latitude/longitude values of each collection of entry to allow the Google Maps API to re-zoom the map view dynamically.



## The Team

Completed with a group of 4 members having just been exposed to the MERN stack, Landmarked was built in just under 5 days! 
- Joe Manso - Backend, state setup, the *Brutal Bug Basher*
- Yisrael (Izzy) Peikes - Backend and state setup, officially dubbed *State and Schema Sensai*
- Josh Laikowski - Frontend and *Styling Savant*, known as the *Heroku Whisperer* and *Betty*
- Mack Zumarraga - Frontend and Google Map API, goes by *Map Magician*

## Features to come
- AI - An AI tht can search the game tree in order to make skilled moves
