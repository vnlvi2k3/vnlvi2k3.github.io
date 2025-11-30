---
layout: page
title: 3D Y-Net for Single-Cell Tracking
description: Siamese Architecture for 3D Time-Lapse Microscopy Analysis
img: assets/img/ynet_tracking.gif
importance: 4
category: research
---

<div class="row">
    <div class="col-sm-12">
        <p class="text-muted">
            <strong>Affiliation:</strong> <a href="https://sites.google.com/site/imbs3dprinting/Home?authuser=0">Integrated MechanoBioSystems Lab, National Cheng Kung University (NCKU)</a> &nbsp;|&nbsp;
            <strong>Type:</strong> International Research Internship (NSTC-funded) &nbsp;|&nbsp;
            <strong>Domain:</strong> 3D Computer Vision, Biomedical Imaging
        </p>
    </div>
</div>

---

## The Challenge

Tracking single cells in 3D time-lapse microscopy is computationally expensive and prone to errors due to cell deformation, occlusion, and rapid morphological changes. Traditional 2D tracking methods lose critical spatial context, while existing 3D approaches suffer from high computational complexity that makes real-time analysis infeasible. The challenge is compounded by the need to handle cell division events, where a single cell splits into multiple daughter cells, requiring robust temporal association across volumetric time-series data.

---

## The Method

We designed a **Y-Net Siamese Architecture**—a dual-branch network capable of processing volumetric data (3D inputs) to perform simultaneous segmentation and tracking across time frames. The architecture operates through:

1. **Siamese Backbone**: Twin 3D convolutional networks process cell candidates from consecutive time frames, extracting discriminative volumetric features
2. **Y-Shaped Feature Fusion**: Multi-scale feature fusion at the network's "Y" junction combines low-level spatial details with high-level semantic information
3. **Embedding Space Learning**: Cells are mapped to a discriminative feature space where matched pairs (same cell across frames) are close, while unmatched pairs are distant
4. **Temporal Consistency Modeling**: Exploits the assumption that cells move smoothly between frames, enabling robust tracking even under deformation

The unified architecture processes full 3D volumes directly, avoiding the information loss inherent in 2D projection methods, while maintaining computational efficiency through optimized 3D convolutions and efficient feature matching.

{% include figure.liquid path="assets/img/ynet_tracking.gif" title="Figure: 3D Single-cell tracking results (GIF)." class="img-fluid rounded z-depth-1" %}

---

## Key Innovation

Unified 4D tracking (3D space + Time) with high inference speed, optimized for fast-moving cell dynamics. Unlike sequential approaches that process frames independently, our Y-Net architecture performs joint segmentation and tracking in a single forward pass, enabling real-time analysis of 3D time-lapse microscopy data. The architecture is specifically designed to handle rapid cell movements and morphological changes that are common in live-cell imaging experiments.

---

## Impact/Results

The 3D Y-Net architecture demonstrates significant improvements in tracking accuracy and computational efficiency compared to traditional methods. Key achievements include:

- **Accurate 4D tracking** of single cells across multiple time frames with high precision
- **Real-time inference** capability, enabling live analysis of time-lapse microscopy experiments
- **Robust handling** of cell division events and morphological changes
- **Superior performance** compared to 2D projection-based methods, particularly for cells with complex 3D trajectories

This project represents my experience in **3D Computer Vision** and **international research collaboration**, conducted during my NSTC-funded internship in Taiwan, providing valuable exposure to cross-cultural scientific collaboration and advanced biomedical imaging research.
