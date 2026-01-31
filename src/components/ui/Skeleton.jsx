const Skeleton = ({ className = "" }) => {
    return (
        <div className={`animate-pulse bg-neutral-500/10 rounded-xl ${className}`} />
    )
}

export default Skeleton
