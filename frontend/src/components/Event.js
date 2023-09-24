import { useEffect, useState } from "react"
//import Calendar from "react-bootstrap/Calendar"
import Calendar from "./Calendar"
import Clock from "./Clock"
import Select from 'react-select' 
import Button from "react-bootstrap/Button"
const url = 'http://127.0.0.1:8000/event/'
const venueUrl = 'http://127.0.0.1:8000/event/venues/'
const participantUrl = 'http://127.0.0.1:8000/event/participants/'
const submitUrl = 'http://127.0.0.1:8000/event/add/'

export default function Event(props){
    const eventData = {
        'name':'',
        'date':'',
        'time':'',
        'venueId':'',
        'participantId':''
    }
    const [events, setEvents] = useState([])
    const [venues, setVenues] = useState([])
    const [participants, setParticipants] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [formData, setFormData] = useState(eventData)
    
    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then((result) => {
            let arr = []
            console.log(result)
            // result.map(val =>
            //     arr.push({value:val.id, label:val.name})
            // )
            debugger
            setVenues(result)
        })
    },[])

    useEffect(() => {
        fetch(participantUrl)
        .then(response => response.json())
        .then((result) => {
            let arr = []
            debugger
            result.map(val => 
                arr.push({value:val.id, label:val.profile.user.name})
            )
            setParticipants(arr)
        })
    },[])

    const VenueOptions = venues.map(v => <option value={v.id}>{v.name}</option>)

    function handleChange(key, e){
        debugger
        if (key == 'venueId')
            eventData.venueId = e.target.value
        else if (key == 'name')
            eventData.name = e.target.value
        else if (key == 'date')
            eventData.date = e
        else if (key == 'participantId')
            eventData.participantId = e.target.value
        else if (key == 'time')
            eventData.time = e.target.value
        setFormData(eventData)
        console.log(eventData)
    }

    function handleSubmit(){
        setLoading(true)
        fetch(submitUrl,
            {
            method: 'POST',
            body:JSON.stringify({})
        })
        .then(response => response.json())
        .then(result => {
            debugger
            console.log(result)
            setLoading(false)
        })
    }

    const createEvent = <div className="form">
        <div className='row p-2'>
            <div className='col-md-2'>Event Name</div>
            <div className='col-md-3'><input className="form-control" onChange={(e) => handleChange('name', e)}/></div>
            <div className='col-md-2'>Select Date</div>
            <div className='col-md-3'><Calendar onChange={(e) => handleChange('date', e)}/></div>
        </div>
        
        <div className='row p-2'>
        <div className='col-md-2'>Select Time</div>
            <div className='col-md-3'><Clock /></div>
            <div className='col-md-2'>Venue</div>
            <div className="col-md-3">
                <Select options={VenueOptions} onChange={(e) => handleChange('venueId', e)}/>
            {/* <select className="form-control">
                {VenueOptions}
            </select> */}
            </div>
            {/* <div className='col-md-3'><input className="form-control"/></div> */}
        </div>
        <div className='row p-2'>
            <div className="col-md-2">Add Participants</div>
            <div className="col-md-3"><Select options={participants} isMulti onChange={() => handleChange('participantId', this.value)}/></div>
        </div>
            <br/>
            <Button disabled={isLoading} onClick={handleSubmit} className="mx-5">{isLoading ? 'Loading...' : 'Create Event'}</Button>
        
        
    </div>
    
    // function prepareEventList(){
    //     for(let i=0; i<events.length; i++){
    //         const eventList = events[i].map(event => <tr>
    //             <td>{event.name}</td>
    //             <td>{'Online' ? !event.venue : event.venue}</td>
    //             <td>{event.date} {event.time}</td>
    //             <td></td>
    //         </tr>)
    //     }
    // }

    const eventList = events.map(event => <tr>
        <td>{event.name}</td>
        <td>{'Online' ? !event.venue : event.venue}</td>
        <td>{event.date} {event.time}</td>
        <td></td>
    </tr>)
    return(
        <div className="container">
            <h4 className="mx-5">Current Events</h4>
            <table className="table table-striped">
                <thead>
                    <th>Event Name</th>
                    <th>Venue</th>
                    <th>Date & Time</th>
                </thead>
            <tbody>
                {eventList}
            </tbody>

            </table>
            {createEvent}
        </div>
        
    )
}