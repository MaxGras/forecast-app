interface ArrowIconProps {
    width: number;
    height: number;
    fill: string;
    deg: number|undefined
  }


 export default function ArrowSVG(props:ArrowIconProps) {
    const { width, height, fill, deg } = props;
    return(
    
<svg style={{transform: `rotate(${deg}deg)`}} width = {width}  fill={fill} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	 height={height} viewBox="0 0 350.488 350.487"
	 xmlSpace="preserve">
<g>
	<g>
		<g>
			<polygon points="83.386,128.082 100.958,145.697 162.805,83.854 162.805,302.071 187.674,302.071 187.674,83.86 249.505,145.691 
				267.105,128.088 175.238,36.236 			"/>
		</g>
		<g>
			<path d="M175.238,0.006C78.615,0.006,0,78.615,0,175.244c0,96.629,78.615,175.237,175.238,175.237
				c96.635,0,175.25-78.608,175.25-175.237C350.488,78.615,271.874,0.006,175.238,0.006z M175.238,326.763
				c-83.551,0-151.522-67.968-151.522-151.519S91.688,23.722,175.238,23.722c83.556,0,151.531,67.972,151.531,151.522
				S258.794,326.763,175.238,326.763z"/>
		</g>
	</g>
</g>
</svg>
    )
} 
