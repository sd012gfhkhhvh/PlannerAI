import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const Loader = () => {
    return <div>
      <SkeletonTheme baseColor="#0F172A" highlightColor="#334155" height="3rem">
        <p className='mb-3'>
          <Skeleton count={1} />
        </p>
      </SkeletonTheme>
  
      <SkeletonTheme baseColor="#0F172A" highlightColor="#444" height="1rem">
        <span>
          <Skeleton count={3} />
        </span>
      </SkeletonTheme>
  
    </div>
  }
