import Skeleton from "react-loading-skeleton";

import { classes } from "@utils/classes";

const DataHandleLayout = ({
    data,
    children,
    className,
    SkeletonCount = 5,
    containerClassNameSkeleton,
    emptyText = "No data available",
}) => {
    if (data.error) {
        return (
            <div
                className={classes([
                    " text-center text-red-500",
                    className ?? "",
                ])}>
                {data.error}
            </div>
        );
    }
    if (data?.data?.length === 0 && !data.isLoading && !data.error) {
        return (
            <div className={classes(["", className ?? ""])}>{emptyText}</div>
        );
    }

    if (data.isLoading) {
        return (
            <Skeleton
                containerClassName={containerClassNameSkeleton}
                count={SkeletonCount}
            />
        );
    }

    return <>{children}</>;
};

export default DataHandleLayout;
