import { connect } from "react-redux";
import Logger_search from "./Logger_search"



const mapStateToProps = (state) => ({
  dates: state.dates
});


  
export default connect(mapStateToProps)(Logger_search);

