import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enGB } from 'date-fns/locale/en-GB';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReactCalendar from 'react-calendar';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';

const locales = {
    'en-GB': enGB,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const CalendarPage = () => {

    const [events, setEvents] = useState([
        {
            title: 'MOT - Ford Fiesta',
            start: new Date(new Date().setHours(10, 0, 0)),
            end: new Date(new Date().setHours(11, 0, 0)),
        },
        {
            title: 'Diagnostics - BMW 320d',
            start: new Date(new Date().setHours(14, 0, 0)),
            end: new Date(new Date().setHours(15, 30, 0)),
        },
    ]);

const [view, setView] = useState(Views.WEEK);
const [date, setDate] = useState(new Date());
const [selectedEvent, setSelectedEvent] = useState(null);
const [title, setTitle] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const getEventDates = () => {
    const eventDates = events.map(event => format(event.start, 'yyyy-MM-dd'));
    return eventDates;
};

const handleSumbit = (e) => {
    e.preventDefault();

    if (!title || !startDate || !endDate) {
        alert('Please fill in all fields!');
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const newEvent = {
    title,
    start,
    end,
    };
    setEvents([...events, newEvent]);
    setTitle('');
    setStartDate('');
    setEndDate('');
};

return (
    <div className='container'>
        <h2 className='mb-4'>Garage Work Calendar</h2>
        <form onSubmit={handleSubmit} className='mb-4'>
            <div className='row g-2'>
                <div className='col-md-6'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Job Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className='col-md-3'>
                    <input
                        type='datetime-local'
                        className='form-control'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className='col-md-3'>
                    <input 
                        type='datetime-local'
                        className='form-control'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
            </div>
            <button type='submit' className='btn btn-primary mt-2'>Add Job</button>
        </form>

        <div className='row'>
            <div className='col-md-8'>
                {/* Week View Calendar */}
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor='start'
                    endAccessor='end'
                    style={{ height: 500}}
                    views={['week']}
                    view={view}
                    onView={(newView) => setView(newView)}
                    min={new Date(1970, 1, 1, 8, 30)}
                    max={new Date(1970, 1, 1, 17, 30)}
                    step={30}
                    timeslots={1}
                    onSelectEvent={(event) => {
                        setSelectedEvent(event);
                       const modalEl = document.getElementById('eventModal');
                            if (modalEl) {
                            const modal = new Modal(modalEl);
                            modal.show();
                        }
                    }}
                />
            </div>

            <div className='col-md-4'>
                {/* Full Calendar with highlighted days */}
                <ReactCalendar
                    onChange={setDate}
                    value={date}
                    tileClassName={({date}) => {
                        const eventDates = getEventDates();
                        const currentDate = format(date, 'yyyy-MM-dd');
                        return eventDates.includes(currentDate) ? 'highlighted' : '';
                    }}
                />
            </div>
            {/**Calendar Modal*/}
<div className='modal fade' id='eventModal' tabIndex='-1' aria-labelledby='eventModalLabel' aria-hidden='true'>
    <div className='modal-dialog'>
        <div className='modal-content'>
            <div className='modal-header'>
                <h5 className='modal-title' id='eventModalLabel'>{selectedEvent?.title}</h5>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
            </div>
            <div className='modal-body'>
                <p><strong>Start:</strong> {selectedEvent?.start?.toLocaleString()}</p>
                <p><strong>End:</strong> {selectedEvent?.end?.toLocaleString()}</p>
                <p><strong>Description:</strong> {selectedEvent?.description || "No additional details."}</p>
            </div>
            <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
            </div>
        </div>
    </div>
</div>
        </div>
    </div>
);
}

export default CalendarPage;