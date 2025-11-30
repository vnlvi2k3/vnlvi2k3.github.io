---
layout: page
title: DragPC
description: Interactive 3D Editing
img: assets/img/dragpc.jpg
importance: 3
category: research
---

<div class="row">
    <div class="col-sm-12">
        <p class="text-muted">
            <strong>Affiliation:</strong> FPT Software AI Center &nbsp;|&nbsp;
            <strong>Domain:</strong> Generative AI, 3D Computer Vision
        </p>
    </div>
</div>

---

## The Challenge

Precise, interactive editing of 3D point clouds is computationally expensive and mathematically complex. Traditional mesh-based deformation requires complex manual rigging, while learning-based methods often produce artifacts or fail to preserve geometric consistency. The recent success of "drag-based" editing in 2D images (e.g., DragGAN) raises a compelling question: *Can we enable intuitive drag-and-drop editing for 3D point clouds?*

---

## The Method

Applied **Denoising Diffusion Implicit Models (DDIM)** to invert the diffusion process. By manipulating the latent code, we allow users to "drag" keypoints in 3D space, and the model regenerates the geometry consistently. The framework operates through three key stages:

1. **DDIM Inversion**: Maps the input point cloud into the diffusion model's latent space while preserving reconstruction fidelity
2. **Latent Space Manipulation**: User-specified drag operations (source point → target point) are encoded as latent modifications through gradient-based optimization
3. **Guided Denoising**: The modified latent is passed through the DDIM sampling process with geometric guidance, ensuring the output satisfies drag constraints while maintaining global structure

{% include figure.liquid path="assets/img/dragpc.jpg" title="Figure 3: Interactive point cloud deformation." class="img-fluid rounded z-depth-1" %}

---

## Key Innovation

**Bridging Generative AI (Diffusion) with 3D Structural Editing**: We leverage DDIM's deterministic sampling and invertibility properties to enable precise control over 3D geometry. Unlike standard DDPM, DDIM allows faithful reconstruction of the input before editing and requires only 10-50 denoising steps (vs. 1000 for DDPM), making interactive editing computationally feasible.

---

## Applications

DragPC enables intuitive 3D content creation across multiple domains:
- **CAD/Product Design**: Rapid prototyping and design iteration
- **Gaming/VR**: Interactive asset creation and modification
- **Medical Education**: Deformable 3D anatomy models for teaching
- **Robotics Simulation**: Generating diverse object variations for training

---

## Broader Impact

DragPC demonstrates my versatility beyond medical imaging—showcasing expertise in **generative AI** and **3D deep learning**. The diffusion modeling techniques developed here directly inform my medical imaging research, where generative models are increasingly important for data augmentation, anomaly detection, and counterfactual analysis.
