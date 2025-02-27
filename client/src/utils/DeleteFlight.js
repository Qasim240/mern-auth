
import { deleteFlightRecord } from "../redux/slices/flightRecordSlice";

export const handleDeleteFlight = async (id, deleteFlight, dispatch) => {
    try {
        const response = await deleteFlight({ id }).unwrap();
        if (response.data?.message === "Flight deleted successfully") {
            dispatch(deleteFlightRecord({ id }));
        }
    } catch (error) {
        console.log("handleDeleteFlight:", error);
    }
};