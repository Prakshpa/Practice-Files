import type useAudioPlayer from "./useAudioPlayer"

export type Audio = {
    src: string,
    duration: number,
    time: number
    play: boolean
}
export type AudioItem = {
    id: number,
    src: string,
    title: string
}
export type AudioProps = ReturnType<typeof useAudioPlayer>
