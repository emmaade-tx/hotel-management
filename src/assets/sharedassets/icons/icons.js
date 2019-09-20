import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export class ScheduleIcon extends React.Component {
    render(){
        const { className } = this.props;

        return (
            <SvgIcon className={className}>
                <path d="M20,8H4V6h16V8z M18,2H6v2h12V2z"/>
                <path d="M20,10H4c-1.1,0-2,0.9-2,2v8c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-8C22,10.9,21.1,10,20,10z M20,17.7c0,2.3,0,2.3-2.6,2.3
                	H6.6C4,20,4,20,4,17.7v-3.3C4,12,4,12,6.6,12h10.8c2.6,0,2.6,0,2.6,2.3V17.7z"/>
            </SvgIcon>
        )
    }
}

export class CompanyIcon extends React.Component {
	render(){
	  const { viewBox, className } = this.props;
	  return (
		  <SvgIcon viewBox={viewBox} className={className}>
		  	<path className="cls" d="M76.4 22.2h4.9L89 41.9l7.6-19.7h4.8L90.9 48H87L76.4 22.2zm30.7 0H126v4.1h-14.4v6.6h12.8V37h-12.8v6.8h14.6v4.1h-19V22.2zm25.9 0h4.8l7.7 12.1 7.7-12.1h4.8v25.6h-4.4V29.4l-6.8 12.2h-2.7l-6.7-12.1v18.3H133V22.2zm32.3 0h11.4c2.9 0 5.1.8 6.6 2.3 1.1 1.1 1.7 2.6 1.7 4.2v.1c0 .8-.1 1.5-.3 2.1s-.5 1.1-.8 1.6-.7.8-1.2 1.2c-.4.3-.9.6-1.4.9l2 .9c.6.4 1.1.8 1.6 1.3.4.5.8 1.1 1 1.7.2.7.4 1.4.4 2.3v.1c0 1.1-.2 2.2-.7 3-.4.9-1.1 1.6-1.9 2.2s-1.8 1-3 1.3-2.4.5-3.8.5h-11.8V22.2zM175.9 33c1.4 0 2.6-.3 3.5-.9s1.3-1.4 1.3-2.6v-.1a3.04 3.04 0 0 0-1.1-2.4c-.8-.6-1.9-.9-3.3-.9h-6.4V33h6zm1.3 10.8c1.5 0 2.7-.3 3.6-.9s1.3-1.5 1.3-2.6v-.1c0-1.1-.4-1.9-1.3-2.5s-2.2-.9-3.9-.9h-7.1v7h7.4zM200.4 22h4.1l11.2 25.8H211l-2.6-6.2h-12l-2.6 6.2h-4.6L200.4 22zm6.4 15.6l-4.4-10.3-4.4 10.3h8.8zM31 5l-8 13H8zm2.5-1.5l-8 14L45 10.4zm15.5 9L60 19l-7 14zm-2-.5l4.2 22L25 20zm-26 8l-15-.5s-.1 5-.5 14m17-12.5v30l-17-15.2zM6.2 50.5L5.2 38 21 52 6.2 50.5zm3.8 2.3l20 11.7L23 54zM26 55l19 6-11.5 5.5zm-.5-2.2L47 60l4-22zm34.7-29.6v24.3L53.5 36zM53 39l7 12-10.8 7.2z"/>
		</SvgIcon>
		)
	}
}


export class PreviewIcon extends React.Component {
	render(){
	  const { viewBox, className } = this.props;
	  return (
          <SvgIcon viewBox={viewBox} className={className}>
			  <path d="M18 1c9.4 0 17 7.6 17 17s-7.6 17-17 17S1 27.4 1 18A17 17 0 0 1 18 1m0-1C8.06 0 0 8.06 0 18s8.06 18 18 18 18-8.06 18-18A18 18 0 0 0 18 0zM9.5 28V8l21 10.5-21 9.5z"/>
          </SvgIcon>
		)
	}
}
