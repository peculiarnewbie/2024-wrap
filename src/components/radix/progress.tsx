import { useEffect, useState } from "react";
import * as Progress from "@radix-ui/react-progress";

const ProgressDemo = (props: { progress: number }) => {
    return (
        <Progress.Root className="ProgressRoot" value={props.progress}>
            <Progress.Indicator
                className="ProgressIndicator"
                style={{ transform: `translateX(-${100 - props.progress}%)` }}
            />
        </Progress.Root>
    );
};

export default ProgressDemo;
