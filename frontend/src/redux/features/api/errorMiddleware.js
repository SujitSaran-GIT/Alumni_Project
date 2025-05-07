import { toast } from 'react-hot-toast';

export const errorMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        const errorMessage = action.payload?.data?.message ||
            action.error?.message ||
            'Request failed';
        toast.error(errorMessage);
    }
    return next(action);
};

// Then add it to your store middleware:
// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware()
//     .concat(apiSlice.middleware)
//     .concat(errorMiddleware)