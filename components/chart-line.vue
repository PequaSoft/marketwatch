<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title">Line</h2>

      <div class="btn-group btn-group-toggle">
        <label v-for="(item, index) in btn" :key="index" :class="{ active: item.value == radio }" class="btn btn-success">
          <input v-model="radio" :name="dataLabel" :value="item.value" type="radio" />
          {{ item.label }}
        </label>
      </div>
    </div>

    <div class="card-img-bottom">
      <chartjs-line id="myChart" ref='chart'
        :backgroundcolor="bgColor"
        :beginzero="beginZero"
        :bind="true"
        :bordercolor="borderColor"
        :data="fullData"
        :datalabel="dataLabel"
        :labels="fullLabel"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgColor: "#81894e",
      beginZero: false,
      borderColor: "#81894e",
      btn: [
        { label: "Today", value: "day" },
        { label: "This Week", value: "week" }
      ],
      data: {
        day: [1, 3, 5, 3, 1],
        week: [12, 14, 16, 18, 11, 13, 15]
      },
      dataLabel: "Foo",
      labels: {
        day: [8, 10, 12, 14, 16],
        week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      },
      radio: "day"
    };
  },
  computed: {
    fullLabel: function () {
      return this.labels.day
    },
     fullData: function () {
      return this.data.day
    }
  },

  watch: {
    data: function() {
      alert('watch-' + this.data.day);
      this._chart.destroy();
      //console.log(this.data);
      //console.log(this.options);
      
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    }
  },
   created () {
    this.$bus.$on('UPDATE_LINECHART_DATA', (data) => {
      this.data.day = data    //[21, 13,15, 23, 14]
      // this.$refs.chart.render()
      //this._chart.update();
      // var canvas = document.getElementById('myChart');
      // var myLineChart = Chart.Line(canvas,{	data:data, options:option });
      // this.update();
      
      // alert('UPDATE_LINECHART-' + this.data.day);
    })

    this.$bus.$on('UPDATE_LINECHART_LABELS', (data) => {
      this.labels.day = data    //[21, 13,15, 23, 14]
      //this.$forceUpdate();
      // var canvas = document.getElementById('myChart');
      // var myLineChart = Chart.Line(canvas,{	data:data, options:option });
      //this._chart.update();
      // this.chart.renderChart();
      
      // alert('UPDATE_LINECHART-' + this.data.day);
    })
   }
};
</script>
