const Badge = ({ children, className = "" }) => {
    return (
        <span className={`px-3 py-1 text-sm font-medium rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 ${className}`}>
            {children}
        </span>
    )
}

export default Badge
