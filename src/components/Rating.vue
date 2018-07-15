<template>
	<div class="rating">
		<ul class="list">
			<li class="star" v-for="star in maxStars" :class="{active : star <= stars}" @click="rate(star)">
				<icon :name="star <= stars ? 'star' : 'star-o'"/>
			</li>
		</ul>
		<span v-if="hasCounter">{{ stars }} of {{ maxStars }}</span>
	</div>
</template>
<style scoped>
  	.rating {
    	font-family: 'Avenir', Helvetica, Arial, sans-serif;
    	font-size: 14px;
    	color: #a7a8a8;
  	}
  	.list {
    	margin: 0 0 5px 0;
    	padding: 0;
    	list-style-type: none;
  	}
  	.list:hover .star {
    	color: #f3d23e;
  	}
  	.star {
    	display: inline-block;
    	cursor: pointer;
    	margin: 0 1px;
  	}
  	.star:hover ~ .star:not(.active) {
    	color: inherit;
  	}
  	.active {
    	color: #f3d23e;
  	}
</style>
<script type="text/javascript">
	import 'vue-awesome/icons/star'
	import 'vue-awesome/icons/star-o'

	import Icon from 'vue-awesome/components/Icon'

	export default {
		props: ['grade', 'maxStars', 'hasCounter'],
		// props: {
		// 	grade: {
		// 		type: Number,
		// 		require: true
		// 	},
		// 	maxStars: {
		// 		type: Number,
		// 		require: true
		// 	},
		// 	hasCounter: {
		// 		type: Boolean,
		// 		require: true
		// 	}
		// },
		components: { Icon },
		data() {
			return {
	       		stars: this.grade,
	        	maxStars: this.maxStars,
	        	hasCounter: this.hasCounter
	      	}
		},
		methods: {
			rate(star) {
				if (typeof star === 'number' && star >= 0 && star <= this.maxStars) {
					this.stars === star ? this.stars = star - 1 : this.stars = star
				}
			}
		}
	}
</script>