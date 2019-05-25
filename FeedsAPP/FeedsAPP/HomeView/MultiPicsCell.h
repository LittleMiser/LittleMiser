//
//  MulitiPicsCell.h
//  FeedsAPP
//
//  Created by student4 on 2019/5/18.
//  Copyright © 2019 iosGroup. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "HomeViewModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface MultiPicsCell : UITableViewCell

@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UIImageView *leftImage;
@property (weak, nonatomic) IBOutlet UIImageView *middleImage;
@property (weak, nonatomic) IBOutlet UIImageView *rightImage;
@property (weak, nonatomic) IBOutlet UILabel *infoLabel;


@property (nonatomic , strong)NSArray *imageViews;
@property(nonatomic,strong) HomeViewModel *model;

@end

NS_ASSUME_NONNULL_END
