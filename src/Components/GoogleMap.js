/* eslint-disable jsx-a11y/iframe-has-title */
import '../App.css';

function GoogleMap() {
  return (
    <div className="p-2 bg-purple-600">
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe className="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=floristeria la chinita&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
        </div>
      </div>
    </div>
  )
}

export default GoogleMap;