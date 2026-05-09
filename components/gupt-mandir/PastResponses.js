export default function ResponseCard({
  concern  = '',
  reply    = '',
  status   = 'under-review',
  date     = '',
}) {
  return (
    <div className="rounded-2xl p-5"
      style={{
        background: '#FFF8F0',
        border: '1px solid rgba(245,200,66,0.3)',
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Blurred concern */}
          <p className="text-sm mb-2 select-none leading-relaxed"
            style={{
              color: 'rgba(44,26,14,0.5)',
              filter: 'blur(4px)',
            }}
          >
            {concern}
          </p>
          <p className="text-xs" style={{ color: '#C4956A' }}>{date}</p>
        </div>

        {/* Status badge */}
        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ml-3 flex-shrink-0"
          style={
            status === 'replied'
              ? { background: 'rgba(45,106,79,0.1)',   color: '#2D6A4F' }
              : { background: 'rgba(245,200,66,0.15)', color: '#C4956A' }
          }
        >
          {status === 'replied' ? '✓ Replied' : '● Under Review'}
        </span>
      </div>

      {/* Doctor reply */}
      {status === 'replied' && reply && (
        <div className="mt-4 pt-4"
          style={{ borderTop: '0.5px solid rgba(232,180,184,0.3)' }}
        >
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
              style={{ background: '#EEEDFE', color: '#3C3489' }}
            >
              Dr
            </div>
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: '#3C3489' }}>
                Admin · Doctor Response
              </p>
              <p className="text-sm text-[#2C1A0E] leading-relaxed">
                {reply}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Under review message */}
      {status === 'under-review' && (
        <div className="mt-4 pt-4"
          style={{ borderTop: '0.5px solid rgba(232,180,184,0.3)' }}
        >
          <p className="text-sm italic" style={{ color: 'rgba(44,26,14,0.6)' }}>
            A trusted professional is reviewing your concern.
            You will be notified when they respond.
          </p>
        </div>
      )}
    </div>
  )
}