# Geography and substrate — v9.2.0

Coastline: Natural Earth 1:50m land polygons (public domain), already bundled in world-land-*.js. Local land masks use a 100 km square at 1024 samples, with an urban dry apron. These are schematic, not surveyed shorelines.

Substrate: RESOLVE Ecoregions 2017, Dinerstein et al., An Ecoregion-Based Approach to Protecting Half the Terrestrial Realm, https://doi.org/10.1093/biosci/bix014. License CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/ . Dataset: https://developers.google.com/earth-engine/datasets/catalog/RESOLVE_ECOREGIONS_2017 . Public distribution: https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/Resolve_Ecoregions/FeatureServer/0 .

This project extracts biome 13 (deserts and xeric shrublands) and biome 11 (tundra), simplifies polygons by 0.025 degrees, and omits very small fragments and Antarctica. Desert classification describes a regional arid substrate; it does not assert that every desert is dune sand. Urban lawns remain cultivated gardens. Irrigated valleys and non-arid regions remain distinct. This is regional approximation, not parcel-level land-cover data.

Intercity roads share the map graph and local east/north directions. Connections terminate at actual graph destinations; roads beyond the regional view are clipped inside atmospheric fog. No synthetic island loops are added. Mountain roads use contour search and follow the actual triangulated terrain surface.

Biome weights are spatially softened before shading; vegetation density uses the same continuous weights. Far woodland uses procedural instanced silhouettes and canopy patches up to 52 km, overlapping the near geometry from 4.7 to 6.6 km. Neighbor previews use east/north projection from the same coordinates as road endpoints. Scene handoff rebases camera coordinates without rotating the view. These are regional approximations, not surveyed terrain or real building reconstructions.
