import * as Slider from "@radix-ui/react-slider";

const VolumeSlider = (props: { onVolumeChange: (volume: number) => void }) => (
    <form>
        <Slider.Root
            className="SliderRoot"
            defaultValue={[50]}
            max={100}
            step={1}
            onValueChange={(value) => props.onVolumeChange(value[0])}
        >
            <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
            </Slider.Track>
            <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>
    </form>
);

export default VolumeSlider;
