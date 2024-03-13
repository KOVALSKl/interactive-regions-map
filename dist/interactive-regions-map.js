import { openBlock as v, createElementBlock as k, createElementVNode as I, resolveComponent as g, createBlock as b, withCtx as p, createVNode as m, createTextVNode as x, toDisplayString as z, ref as l, computed as V, onMounted as F, Fragment as J, renderList as L, renderSlot as H } from "vue";
import * as r from "d3";
const q = { class: "map-region" }, G = ["d"], K = {
  __name: "MapRegion",
  props: ["d", "data", "onclick"],
  setup(a) {
    const e = a;
    return (i, c) => (v(), k("g", q, [
      I("path", {
        class: "map-region-path",
        d: e.d,
        onClick: c[0] || (c[0] = (o) => a.onclick(o, a.data))
      }, null, 8, G)
    ]));
  }
}, Z = {
  __name: "RegionInfo",
  props: ["regionData"],
  emits: ["next", "previous"],
  setup(a) {
    return (e, i) => {
      const c = g("v-card-title"), o = g("v-card-text"), h = g("v-spacer"), _ = g("v-btn"), d = g("v-card-actions"), u = g("v-card");
      return v(), b(u, {
        elevation: "3",
        id: "region-info-card"
      }, {
        default: p(() => [
          m(c, { class: "region-title" }, {
            default: p(() => [
              x(z(a.regionData.properties.NAME_1), 1)
            ]),
            _: 1
          }),
          m(o, { class: "region-info" }, {
            default: p(() => [
              x(z(a.regionData.properties), 1)
            ]),
            _: 1
          }),
          m(d, null, {
            default: p(() => [
              m(h),
              m(_, {
                variant: "text",
                onClick: i[0] || (i[0] = (f) => e.$emit("next"))
              }, {
                default: p(() => [
                  x(" previous ")
                ]),
                _: 1
              }),
              m(_, {
                variant: "text",
                onClick: i[1] || (i[1] = (f) => e.$emit("previous"))
              }, {
                default: p(() => [
                  x(" next ")
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
}, Q = { class: "map-container w-100" }, U = ["width", "height", "transform", "viewBox"], W = { id: "regions-container" }, X = /* @__PURE__ */ I("path", {
  fill: "none",
  stroke: "white",
  "stroke-linejoin": "round"
}, null, -1), C = 1500, ee = {
  __name: "RegionsMap",
  props: {
    width: {
      type: Number,
      default: 900
    },
    height: {
      type: Number,
      default: 900
    },
    regions: {
      type: Object,
      default: regionsJSON
    },
    regionsIndexes: {
      type: Object,
      default: regionsIndexesJSON
    }
  },
  setup(a) {
    const e = a, i = e.regions.features.length, c = r.geoTransverseMercator().fitSize([e.width, e.height], e.regions), o = l(0), h = l(r.geoPath().projection(c)), _ = l(null), d = l(null), u = l(null), f = l(null), R = l(null), y = V(() => e.regions.features[o.value]);
    function D(t) {
      t >= 0 && t < i && (o.value = t);
    }
    function T(t) {
      for (let n = 0; n < i; n++)
        if (e.regions[n].properties.id === t.properties.id)
          return n;
    }
    function B(t) {
      let n = t.properties.id;
      return e.regionsIndexes[n].index;
    }
    function P() {
      o.value += 1, o.value === i && (o.value = 0), M();
    }
    function j() {
      o.value -= 1, o.value < 0 && (o.value = i - 1), M();
    }
    function M() {
      let t = y.value.properties.id;
      document.getElementById(t).lastChild.dispatchEvent(new MouseEvent("click", void 0));
    }
    function S(t) {
      const { transform: n } = t;
      f.value.attr("transform", n), f.value.attr("stroke-width", 1 / n.k);
    }
    function O() {
      u.value.transition().duration(C).call(
        d.value.transform,
        r.zoomIdentity,
        r.zoomTransform(u.value.node()).invert([e.width / 2, e.height / 2])
      );
    }
    function A(t, n) {
      const [[s, E], [N, $]] = h.value.bounds(n);
      t.stopPropagation(), R.value.transition().style("fill", null), r.select(t.currentTarget).transition().style("fill", "red");
      let w;
      e.regionsIndexes ? w = B(n) : w = T(n), D(w), u.value.transition().duration(C).call(
        d.value.transform,
        r.zoomIdentity.translate(e.width / 2, e.height / 2).scale(Math.min(8, 0.9 / Math.max((N - s) / e.width, ($ - E) / e.height))).translate(-(s + N) / 2, -(E + $) / 2)
      );
    }
    return F(() => {
      d.value = r.zoom().scaleExtent([1, 8]).on("zoom", S), u.value = r.select("svg").on("click", O).call(d.value), R.value = r.selectAll("path"), f.value = r.select("#regions-container");
    }), (t, n) => (v(), k("div", Q, [
      (v(), k("svg", {
        id: "map",
        width: e.width,
        height: e.height,
        transform: _.value,
        viewBox: [0, 0, e.width, e.height]
      }, [
        I("g", W, [
          (v(!0), k(J, null, L(a.regions.features, (s) => (v(), b(K, {
            key: s.properties.NAME_1,
            id: s.properties.id,
            ref_for: !0,
            ref: "regionsRef",
            data: s,
            d: h.value(s),
            onclick: A
          }, null, 8, ["id", "data", "d"]))), 128)),
          X
        ])
      ], 8, U)),
      H(t.$slots, "default", {
        regionData: y.value,
        onNext: P,
        onPrevious: j
      })
    ]));
  }
};
export {
  K as MapRegion,
  Z as RegionInfoCard,
  ee as RegionsMap
};
